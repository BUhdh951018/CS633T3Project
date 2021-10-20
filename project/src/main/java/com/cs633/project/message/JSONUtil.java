package com.cs633.project.message;

import com.alibaba.fastjson.JSONObject;

import java.util.Date;

/**
 * Name: Donghang He
 * Date: 2021/10/6 7:59 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public class JSONUtil {

    public static JSONObject createJSON(String cmd, boolean success, String message, JSONObject body) {
        JSONObject object = new JSONObject();
        object.put("cmd", cmd);
        object.put("success", success);
        object.put("message", message);
        object.put("body", body);
        return object;
    }

    public static JSONObject createUser(String username, String email, Long phone, Date birthday, String label) {
        JSONObject object = new JSONObject();
        object.put("username", username);
        object.put("email", email);
        object.put("phone", phone);
        object.put("birthday", birthday);
        object.put("label", label);
        return object;
    }
}
