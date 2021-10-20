package com.cs633.project;

import com.cs633.project.db.dao.UserRepository;
import com.cs633.project.message.ReadMessage;
import com.cs633.project.service.inter.ILoginService;
import com.cs633.project.service.inter.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Name: Donghang He
 * Date: 2021/9/29 7:21 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Component
public class DataBus implements IDataBus {

    @Autowired
    private IUserService userService;

    @Autowired
    private ILoginService loginService;

    @Autowired
    private ReadMessage readMessage;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserRepository userRepository() {
        return userRepository;
    }

    @Override
    public ReadMessage readMessage() {
        return readMessage;
    }

    @Override
    public IUserService userService() {
        return userService;
    }

    @Override
    public ILoginService loginService() {
        return loginService;
    }
}
