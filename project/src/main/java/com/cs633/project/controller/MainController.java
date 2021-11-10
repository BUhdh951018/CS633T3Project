package com.cs633.project.controller;

import com.cs633.project.IDataBus;
import com.cs633.project.constant.CommonConstant;
import com.cs633.project.message.ReadMessage;
import com.cs633.project.message.ReceiveMessage;
import com.cs633.project.message.SendMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.ParseException;
import java.util.Date;

/**
 * Name: Donghang He
 * Date: 2021/9/29 6:13 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Controller
public class MainController {

    @Autowired
    private IDataBus dataBus;

    @GetMapping("/")
    public String root() {
        return "redirect:/main";
    }

    @GetMapping("/main")
    public String main() {
        return "Main";
    }

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    // for user register
    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam("username") String username,
                               @RequestParam("password") String password,
                               @RequestParam("email") String email,
                               @RequestParam("phone") Long phoneNum,
                               @RequestParam("birth") String birthday,
                               @RequestParam("label") String label) throws ParseException {

        Date birth = CommonConstant.DATE_FORMAT.parse(birthday);

        password = CommonConstant.passwordEncoder.encode(password);
        dataBus.userService().createUser(username, password, email, phoneNum, birth, label);
        return "redirect:/index";
    }

    @PostMapping("/error")
    public String handleError() {
        //do something like logging
        return "error";
    }

    @MessageMapping("/hello")
    @SendTo("/topic/sendMessage")
    public SendMessage sendMessage(ReceiveMessage message) throws Exception {
        //message.setMessage(readMessage.readMessage(message));
        return new SendMessage(dataBus.readMessage().readMessage(message));
    }

    @GetMapping("/testWS")
    public String testWebSocket() {
        return "test/testSocket";
    }

}
