package com.cs633.project.service.inter;

import com.alibaba.fastjson.JSONObject;

/**
 * Name: Donghang He
 * Date: 2021/10/6 8:15 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public interface ILoginService {

    public JSONObject login(String username, String password);
}
