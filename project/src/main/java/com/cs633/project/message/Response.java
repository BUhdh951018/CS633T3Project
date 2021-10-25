package com.cs633.project.message;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.utils.JSONUtil;

/**
 * Name: Donghang He
 * Date: 2021/10/6 7:52 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public class Response {

    private static final JSONObject object = null;

    public static JSONObject sendErrorMessage(String message, String cmd) {
        return JSONUtil.createJSON(cmd, false, message, object);
    }

    public static JSONObject sendSuccessMessage(String cmd) {
        return JSONUtil.createJSON(cmd, true, "", object);
    }

    public static JSONObject sendBody(String cmd, Object body) {
        return JSONUtil.createJSON(cmd, true, "", body);
    }
}
