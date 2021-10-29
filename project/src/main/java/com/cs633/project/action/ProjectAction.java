package com.cs633.project.action;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.constant.CommonConstant;
import com.cs633.project.message.Response;
import com.cs633.project.net.annotation.Action;
import com.cs633.project.utils.GetCurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * Name: Donghang He
 * Date: 2021/10/27 4:45 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Action
@Service
public class ProjectAction {

    @Autowired
    private IDataBus dataBus1;

    private static IDataBus dataBus;

    @PostConstruct
    public void init() {
        dataBus = dataBus1;
    }

    public JSONObject createProject(JSONObject object) {
        Long teamId = object.getLong("teamId");
        String name = object.getString("name");

        if (teamId == null || name == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_INPUT_EMPTY, "createProject");
        }

        return dataBus.projectService().createProject(GetCurrentUser.getUser(object), teamId,
                name, object.getString("description"));
    }

    public JSONObject getProjectInfo(JSONObject object) {
        Long projectId = object.getLong("projectId");
        if (projectId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_INPUT_EMPTY, "getProjectInfo");
        }

        return dataBus.projectService().getProjectInfo(projectId);
    }

    public JSONObject updateProject(JSONObject object) {
        Long projectId = object.getLong("projectId");
        if (projectId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_INPUT_EMPTY, "updateProject");
        }

        String name = object.getString("name");
        String description = object.getString("description");

        return dataBus.projectService().updateProject(GetCurrentUser.getUser(object), projectId, name, description);
    }

    public JSONObject deleteProject(JSONObject object) {
        Long projectId = object.getLong("projectId");
        if (projectId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_INPUT_EMPTY, "deleteProject");
        }

        return dataBus.projectService().deleteProject(GetCurrentUser.getUser(object), projectId);
    }
}
