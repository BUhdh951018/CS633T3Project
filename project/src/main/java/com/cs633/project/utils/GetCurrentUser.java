package com.cs633.project.utils;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.db.entity.User;
import io.netty.handler.codec.json.JsonObjectDecoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Optional;

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
    private IDataBus dataBus1;

    private static IDataBus dataBus;

    @PostConstruct
    public void init() {
        dataBus = dataBus1;
    }

    public static User getUser(JSONObject object) {
        String username = object.getString("username");
        return dataBus.userService().getUserByName(username);
    }

    public static boolean checkUser(String username) {
        boolean flag = false;
        User user = dataBus.userRepository().findByUsername(username);
        if (user != null) {
            flag = true;
        }
        return flag;
    }
}
