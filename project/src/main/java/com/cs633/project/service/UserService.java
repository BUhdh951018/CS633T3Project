package com.cs633.project.service;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.DataBus;
import com.cs633.project.db.entity.User;
import com.cs633.project.message.JSONUtil;
import com.cs633.project.message.Response;
import com.cs633.project.service.inter.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Name: Donghang He
 * Date: 2021/9/29 7:16 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
public class UserService implements IUserService {

    @Autowired
    private DataBus dataBus;

    @Override
    public void createUser(String username, String password, String email, Long phoneNum, Date birthday, String label) {
        User user = new User(username, password, email, phoneNum, birthday, label);
        dataBus.userRepository().save(user);
    }

    @Override
    public User getUserByName(String username) {
        return dataBus.userRepository().findByUsername(username);
    }

    public JSONObject getUserInfo(String username) {
        User user = getUserByName(username);
        return JSONUtil.createUser(user.getUsername(), user.getEmail(),
                user.getPhoneNum(), user.getBirthday(), user.getLabel());
    }
}
