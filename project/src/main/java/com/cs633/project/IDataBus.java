package com.cs633.project;

import com.cs633.project.db.dao.UserRepository;
import com.cs633.project.message.ReadMessage;
import com.cs633.project.service.inter.ILoginService;
import com.cs633.project.service.inter.IUserService;

/**
 * Name: Donghang He
 * Date: 2021/9/29 7:21 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public interface IDataBus {

    // Repository
    UserRepository userRepository();

    // Service
    ReadMessage readMessage();
    IUserService userService();
    ILoginService loginService();
}
