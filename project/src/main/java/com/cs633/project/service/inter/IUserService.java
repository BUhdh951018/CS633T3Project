package com.cs633.project.service.inter;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.db.entity.User;

import java.util.Date;

/**
 * Name: Donghang He
 * Date: 2021/9/29 7:18 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public interface IUserService {

    void createUser(String username, String password, String email, Long phoneNum, Date birthday, String label);

    User getUserByName(String username);

    JSONObject getUserInfo(String username);

    User updateUser(User user);

    JSONObject updateUserInfo(User user, String email, Long phoneNum, Date birthday, String label);
}
