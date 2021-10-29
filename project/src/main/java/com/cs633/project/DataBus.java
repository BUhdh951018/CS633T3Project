package com.cs633.project;

import com.cs633.project.db.dao.ProjectRepository;
import com.cs633.project.db.dao.TaskRepository;
import com.cs633.project.db.dao.TeamRepository;
import com.cs633.project.db.dao.UserRepository;
import com.cs633.project.db.entity.Task;
import com.cs633.project.message.ReadMessage;
import com.cs633.project.service.inter.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Name: Donghang He
 * Date: 2021/9/29 7:21 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Component
public class DataBus implements IDataBus {

    @Autowired
    private IUserService userService;
    @Autowired
    private ILoginService loginService;
    @Autowired
    private ITeamService teamService;
    @Autowired
    private IProjectService projectService;
    @Autowired
    private ITaskService taskService;
    @Autowired
    private ReadMessage readMessage;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public UserRepository userRepository() {
        return userRepository;
    }

    @Override
    public TeamRepository teamRepository() {
        return teamRepository;
    }

    @Override
    public ProjectRepository projectRepository() {
        return projectRepository;
    }

    @Override
    public TaskRepository taskRepository() {
        return taskRepository;
    }

    @Override
    public ReadMessage readMessage() {
        return readMessage;
    }

    @Override
    public IUserService userService() {
        return userService;
    }

    @Override
    public ILoginService loginService() {
        return loginService;
    }

    @Override
    public ITeamService teamService() {
        return teamService;
    }

    @Override
    public IProjectService projectService() {
        return projectService;
    }

    @Override
    public ITaskService taskService() {
        return taskService;
    }
}
