package com.cs633.project.action;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.constant.CommonConstant;
import com.cs633.project.db.entity.User;
import com.cs633.project.message.Response;
import com.cs633.project.net.annotation.Action;
import com.cs633.project.utils.GetCurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * Name: Donghang He
 * Date: 2021/10/23 5:50 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
@Action
public class TeamAction {

    @Autowired
    private IDataBus dataBus1;

    private static IDataBus dataBus;

    @PostConstruct
    public void init() {
        dataBus = dataBus1;
    }

    public JSONObject createTeam(JSONObject object) {
        JSONObject result;
        String teamName = object.getString("name");

        if (teamName.isBlank()) {
            result = Response.sendErrorMessage(CommonConstant.ERROR_TEAM_NAME_EMPTY, "createTeam");
        } else {
            User user = GetCurrentUser.getUser(object);
            result = dataBus.teamService().createTeam(user, teamName);
        }
        return result;
    }

    public JSONObject getTeamInfo(JSONObject object) {
        User user = GetCurrentUser.getUser(object);
        return dataBus.teamService().getTeamInfo(user);
    }

    public JSONObject deleteTeam(JSONObject object) {
        User user = GetCurrentUser.getUser(object);
        Long teamId = object.getLong("teamId");

        if (teamId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TEAM_ID_EMPTY, "deleteTeam");
        }

        return dataBus.teamService().deleteTeam(user, teamId);
    }

    public JSONObject addMember(JSONObject object) {
        Long teamId = object.getLong("teamId");
        Long memberId = object.getLong("memberId");

        if (teamId == null || memberId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_INPUT_EMPTY, "addMember");
        }

        return dataBus.teamService().addMember(GetCurrentUser.getUser(object), teamId, memberId);
    }

    public JSONObject deleteMember(JSONObject object) {
        Long teamId = object.getLong("teamId");
        Long memberId = object.getLong("memberId");

        if (teamId == null || memberId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_INPUT_EMPTY, "deleteMember");
        }

        return dataBus.teamService().deleteMember(GetCurrentUser.getUser(object), teamId, memberId);
    }
}
