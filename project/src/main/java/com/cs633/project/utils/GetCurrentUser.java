package com.cs633.project.utils;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.db.entity.User;
import io.netty.handler.codec.json.JsonObjectDecoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Name: Donghang He
 * Date: 2021/10/25 2:38 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
public class GetCurrentUser {

    @Autowired
    private static IDataBus dataBus;

    public static User getUser(JSONObject object) {
        String username = object.getString("username");
        return dataBus.userService().getUserByName(username);
    }
}
