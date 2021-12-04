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
public class TaskAction {

    @Autowired
    private IDataBus dataBus1;

    private static IDataBus dataBus;

    @PostConstruct
    public void init() {
        dataBus = dataBus1;
    }

    public JSONObject createTask(JSONObject object) {
        Long projectId = object.getLong("projectId");
        if (projectId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PROJECT_NOT_EXIST, "createTask");
        }

        return dataBus.taskService().createTask(GetCurrentUser.getUser(object), projectId, object.getString("name"),
                object.getString("content"), object.getLong("ownerId"), object.getLong("requesterId"),
                object.getDate("start"), object.getDate("end"), object.getInteger("complexity"));
    }

    public JSONObject updateTask(JSONObject object) {
        Long taskId = object.getLong("taskId");
        if (taskId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TASK_NOT_EXIST, "updateTask");
        }

        return dataBus.taskService().updateTask(GetCurrentUser.getUser(object), taskId, object.getString("name"),
                object.getString("content"), object.getLong("ownerId"), object.getLong("requesterId"),
                object.getDate("start"), object.getDate("end"), object.getInteger("complexity"));
    }

    public JSONObject deleteTask(JSONObject object) {
        Long taskId = object.getLong("taskId");
        if (taskId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TASK_NOT_EXIST, "deleteTask");
        }

        return dataBus.taskService().deleteTask(GetCurrentUser.getUser(object), taskId);
    }

    public JSONObject updateTaskStatus(JSONObject object) {
        Long taskId = object.getLong("taskId");
        if (taskId == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TASK_NOT_EXIST, "updateTask");
        }

        return dataBus.taskService().updateTaskStatus(GetCurrentUser.getUser(object), taskId,
                object.getInteger("status"));
    }
}
