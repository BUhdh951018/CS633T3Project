package com.cs633.project.action;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.DataBus;
import com.cs633.project.IDataBus;
import com.cs633.project.constant.CommonConstant;
import com.cs633.project.message.Response;
import com.cs633.project.net.annotation.Action;
import com.cs633.project.net.annotation.Command;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Name: Donghang He
 * Date: 2021/10/4 1:26 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
@Action
public class LoginAction {

    @Autowired
    private IDataBus dataBus1;

    private static IDataBus dataBus;

    @PostConstruct
    public void init() {
        dataBus = dataBus1;
    }

    public JSONObject login(JSONObject object) {

        String username = object.getString("username");
        String password = object.getString("password");

        if (username.isBlank() || password.isBlank()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_LOGIN_EMPTY, "login");
        }

        return dataBus.loginService().login(username, password);
    }
}
