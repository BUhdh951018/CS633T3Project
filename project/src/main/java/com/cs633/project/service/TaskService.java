package com.cs633.project.service;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.constant.CommonConstant;
import com.cs633.project.db.entity.Project;
import com.cs633.project.db.entity.Task;
import com.cs633.project.db.entity.User;
import com.cs633.project.message.Response;
import com.cs633.project.service.inter.ITaskService;
import com.cs633.project.utils.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Optional;

/**
 * Name: Donghang He
 * Date: 2021/10/27 4:47 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
public class TaskService implements ITaskService {

    @Autowired
    private IDataBus dataBus;

    @Override
    public JSONObject createTask(User user, Long projectId, String name, String content, Long ownerId, Long requesterId,
                                 Date start, Date end, Integer complexity) {
        Optional<Project> optionalProject = dataBus.projectRepository().findById(projectId);
        if (optionalProject.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PROJECT_NOT_EXIST, "createTask");
        }

        Project project = optionalProject.get();
        Task task = new Task(name, projectId, content, ownerId, requesterId, start, end, complexity);
        task = dataBus.taskRepository().save(task);
        project.addTask(task.getId());
        dataBus.projectRepository().save(project);
        return Response.sendBody("createTask", JSONUtil.createTask(task));
    }

    @Override
    public JSONObject updateTask(User user, Long taskId, String name, String content, Long ownerId, Long requesterId,
                                 Date start, Date end, Integer complexity) {
        Optional<Task> optionalTask = dataBus.taskRepository().findById(taskId);
        if (optionalTask.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TASK_NOT_EXIST, "updateTask");
        }

        // todo only task owner and requester can change

        Task task = optionalTask.get();
        if (!name.isBlank()) {
            task.setName(name);
        }
        if (!content.isBlank()) {
            task.setContent(content);
        }
        if (ownerId != null) {
            task.setOwnerId(ownerId);
        }
        if (requesterId != null) {
            task.setRequesterId(requesterId);
        }
        if (start != null) {
            task.setStart(start);
        }
        if (end != null) {
            task.setEnd(end);
        }
        if (complexity != null) {
            task.setComplexity(complexity);
        }

        task = dataBus.taskRepository().save(task);
        return Response.sendBody("updateTask", JSONUtil.createTask(task));
    }

    @Override
    public JSONObject deleteTask(User user, Long taskId) {
        Optional<Task> optionalTask = dataBus.taskRepository().findById(taskId);
        if (optionalTask.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TASK_NOT_EXIST, "deleteTask");
        }
        Task task = optionalTask.get();

        // todo only owner can do

        Optional<Project> optionalProject = dataBus.projectRepository().findById(task.getProjectId());
        if (optionalProject.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PROJECT_NOT_EXIST, "deleteTask");
        }
        Project project = optionalProject.get();
        project.deleteTask(taskId);
        dataBus.projectRepository().save(project);

        dataBus.taskRepository().delete(task);
        return Response.sendBody("deleteTask", JSONUtil.deleteItem(taskId));
    }

    @Override
    public JSONObject updateTaskStatus(User user, Long taskId, Integer status) {
        Optional<Task> optionalTask = dataBus.taskRepository().findById(taskId);
        if (optionalTask.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TASK_NOT_EXIST, "deleteTask");
        }
        Task task = optionalTask.get();
        task.setStatus(status);
        task = dataBus.taskRepository().save(task);
        return Response.sendBody("updateTaskStatus", JSONUtil.createTask(task));
    }
}
