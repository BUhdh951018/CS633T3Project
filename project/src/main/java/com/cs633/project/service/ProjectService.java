package com.cs633.project.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.constant.CommonConstant;
import com.cs633.project.db.entity.Project;
import com.cs633.project.db.entity.Task;
import com.cs633.project.db.entity.Team;
import com.cs633.project.db.entity.User;
import com.cs633.project.message.Response;
import com.cs633.project.service.inter.IProjectService;
import com.cs633.project.utils.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Name: Donghang He
 * Date: 2021/10/27 4:47 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
public class ProjectService implements IProjectService {

    @Autowired
    private IDataBus dataBus;

    @Override
    public JSONObject createProject(User user, Long teamId, String name, String description) {
        Optional<Team> optionalTeam = dataBus.teamRepository().findById(teamId);
        if (optionalTeam.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TEAM_NOT_EXIST,"createProject");
        }

        Team team = optionalTeam.get();
        if (!team.getOwnerId().equals(user.getId())) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PERMISSION_DENIED, "createProject",
                    "you can't create project");
        }

        Project project = new Project(name, teamId, description);
        project = dataBus.projectRepository().save(project);
        team.addProject(project.getId());
        dataBus.teamRepository().save(team);
        return Response.sendBody("createProject", JSONUtil.createProject(project));
    }

    @Override
    public JSONObject getProjectInfo(Long projectId) {
        Optional<Project> optionalProject = dataBus.projectRepository().findById(projectId);
        if (optionalProject.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PROJECT_NOT_EXIST, "getProjectInfo");
        }
        JSONArray project = new JSONArray();
        project.add(JSONUtil.createProject(optionalProject.get()));
        return Response.sendBody("getProjectInfo", project);
    }

    @Override
    public JSONObject updateProject(User user, Long projectId, String name, String description) {
        Optional<Project> optionalProject = dataBus.projectRepository().findById(projectId);
        if (optionalProject.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PROJECT_NOT_EXIST, "updateProject");
        }

        Project project = optionalProject.get();
        Optional<Team> optionalTeam = dataBus.teamRepository().findById(project.getTeamId());
        if (optionalTeam.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TEAM_NOT_EXIST, "updateProject");
        }

        Team team = optionalTeam.get();
        if (!team.getOwnerId().equals(user.getId())) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PERMISSION_DENIED, "updateProject",
                    "not owner of this project");
        }

        if (!name.isBlank()) {
            project.setName(name);
        }
        if (!description.isBlank()) {
            project.setDescription(description);
        }
        project = dataBus.projectRepository().save(project);
        return Response.sendBody("updateProject", JSONUtil.createProject(project));
    }

    @Override
    public JSONObject deleteProject(User user, Long projectId) {
        Optional<Project> optionalProject = dataBus.projectRepository().findById(projectId);
        if (optionalProject.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PROJECT_NOT_EXIST, "deleteProject");
        }

        Project project = optionalProject.get();
        Optional<Team> optionalTeam = dataBus.teamRepository().findById(project.getTeamId());
        if (optionalTeam.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TEAM_NOT_EXIST, "deleteProject");
        }

        Team team = optionalTeam.get();
        if (!team.getOwnerId().equals(user.getId())) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PERMISSION_DENIED, "deleteProject",
                    "not owner of this project");
        }

        team.deleteProject(projectId);
        dataBus.teamRepository().save(team);
        dataBus.projectRepository().delete(project);

        List<Task> taskList = dataBus.taskRepository().findAllByProjectId(projectId);
        for (Task task : taskList) {
            dataBus.taskRepository().delete(task);
        }

        return Response.sendBody("deleteProject", JSONUtil.deleteItem(projectId));
    }
}
