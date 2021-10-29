package com.cs633.project.constant;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 * Name: Donghang He
 * Date: 2021/9/29 6:25 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public class CommonConstant {

    // format date
    public static DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    // encode password
    public static PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    // reflect
    public static final String PACKAGE_NAME = "com.cs633.project.action.";
    public static final String[] className = {"LoginAction", "UserInfoAction",
            "TeamAction", "ProjectAction", "TaskAction"};
    // error message
    // login
    public static final String ERROR_LOGIN_EMPTY = "Username/Password is empty!";
    public static final String ERROR_LOGIN_USERNAME = "Username is wrong!";
    public static final String ERROR_LOGIN_PASSWORD = "Password is wrong!";

    // team
    public static final String ERROR_TEAM_NAME_EMPTY = "Team name is empty";
    public static final String ERROR_TEAM_ID_EMPTY = "Please enter team ID!";
    public static final String ERROR_TEAM_NOT_EXIST = "Team not exist!";
    public static final String ERROR_MEMBER_EMPTY = "Team doesn't have member";
    public static final String ERROR_ADD_MEMBER = "Add member error: %s!";
    public static final String ERROR_DELETE_MEMBER = "Delete member error: %s!";

    // project
    public static final String ERROR_CREATE_PROJECT = "Create project error: %s!";
    public static final String ERROR_PROJECT_NOT_EXIST = "Project not exist!";

    // task
    public static final String ERROR_TASK_NOT_EXIST = "Task not exist!";

    // input empty
    public static final String ERROR_INPUT_EMPTY = "Input empty error!";

    // permission
    public static final String ERROR_PERMISSION_DENIED = "Permission denied: %s!";
}
