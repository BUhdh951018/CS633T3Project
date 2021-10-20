package com.cs633.project.service;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.constant.CommonConstant;
import com.cs633.project.db.entity.User;
import com.cs633.project.message.Response;
import com.cs633.project.service.inter.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Name: Donghang He
 * Date: 2021/10/6 8:15 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
public class LoginService implements ILoginService {

    @Autowired
    private IDataBus dataBus;

    private static final String cmd = "login";

    @Override
    public JSONObject login(String username, String password) {
        JSONObject object = null;
        User user = dataBus.userService().getUserByName(username);
        if (user == null) {
            object = Response.sendErrorMessage(CommonConstant.ERROR_LOGIN_USERNAME, cmd);
        } else if (!CommonConstant.passwordEncoder.matches(password, user.getPassword())) {
            object = Response.sendErrorMessage(CommonConstant.ERROR_LOGIN_PASSWORD, cmd);
        } else {
            object = Response.sendSuccessMessage(cmd);
        }
        return object;
    }
}
