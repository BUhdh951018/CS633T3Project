package com.cs633.project;

import com.cs633.project.db.dao.ProjectRepository;
import com.cs633.project.db.dao.TaskRepository;
import com.cs633.project.db.dao.TeamRepository;
import com.cs633.project.db.dao.UserRepository;
import com.cs633.project.message.ReadMessage;
import com.cs633.project.service.inter.*;

/**
 * Name: Donghang He
 * Date: 2021/9/29 7:21 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public interface IDataBus {

    // Repository
    UserRepository userRepository();
    TeamRepository teamRepository();
    ProjectRepository projectRepository();
    TaskRepository taskRepository();

    // Service
    ReadMessage readMessage();
    IUserService userService();
    ILoginService loginService();
    ITeamService teamService();
    IProjectService projectService();
    ITaskService taskService();
}
