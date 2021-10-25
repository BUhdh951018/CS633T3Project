package com.cs633.project.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.db.entity.Team;
import com.cs633.project.db.entity.User;
import com.cs633.project.message.Response;
import com.cs633.project.service.inter.ITeamService;
import com.cs633.project.utils.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Name: Donghang He
 * Date: 2021/10/23 5:55 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
public class TeamService implements ITeamService {

    @Autowired
    private IDataBus dataBus;

    @Override
    public JSONObject createTeam(User user, String name) {
        Long userId = user.getId();
        Team team = new Team(name, userId);
        team.addMember(userId);
        team = dataBus.teamRepository().save(team);
        user.addTeam(team.getId());
        dataBus.userService().updateUser(user);
        return Response.sendSuccessMessage("createTeam");
    }

    @Override
    public JSONObject getTeamInfo(User user) {
        JSONArray teams = new JSONArray();
        if (user.getTeamList() != null) {
            for (Long teamId : user.getTeamList()) {
                Optional<Team> team = dataBus.teamRepository().findById(teamId);
                if (team.isPresent()) {
                    teams.add(JSONUtil.createTeam(team.get()));
                }
            }
        }
        return Response.sendBody("getTeamInfo", teams);
    }


}
