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

    public static DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    public static PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static final String PACKAGE_NAME = "com.cs633.project.action.";

    public static final String[] className = {"LoginAction", "UserInfoAction"};

    public static final String ERROR_LOGIN_EMPTY = "Username/Password is empty!";
    public static final String ERROR_LOGIN_USERNAME = "Username is wrong!";
    public static final String ERROR_LOGIN_PASSWORD = "Password is wrong!";
    public static final String ERROR_TEAM_NAME_EMPTY = "Team name is empty";
}
