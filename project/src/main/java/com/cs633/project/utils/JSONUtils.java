package com.cs633.project.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * Name: Donghang He
 * Date: 2021/9/29 8:34 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public class JSONUtils {

    public static String toJSON(Object object) {
        JSONObject json = (JSONObject) JSONObject.toJSON(object);
        return JSONObject.toJSONString(json, true);
    }

    public static Object toBean(String json) {
        return JSON.parseObject(json);
    }
}
