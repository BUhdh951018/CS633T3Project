package com.cs633.project.action;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.message.Response;
import com.cs633.project.net.annotation.Action;
import com.cs633.project.utils.GetCurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * Name: Donghang He
 * Date: 2021/10/11 2:24 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
@Action
public class UserInfoAction {

    @Autowired
    private IDataBus dataBus1;

    private static IDataBus dataBus;

    @PostConstruct
    public void init() {
        dataBus = dataBus1;
    }

    public JSONObject getUserInfo(JSONObject object) {
        String username = object.getString("username");
        return Response.sendBody("getUserInfo", dataBus.userService().getUserInfo(username));
    }

    public JSONObject updateUserInfo(JSONObject object) {
        return Response.sendBody("updateUserInfo", dataBus.userService().updateUserInfo(
                GetCurrentUser.getUser(object), object.getString("email"), object.getLong("phoneNum"),
                object.getDate("birth"), object.getString("label")
        ));
    }
}
