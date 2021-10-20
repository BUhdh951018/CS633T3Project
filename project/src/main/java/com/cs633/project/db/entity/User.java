package com.cs633.project.db.entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

/**
 * Name: Donghang He
 * Date: 2021/9/27 9:44 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Username is empty!")
    @Size(min = 3, max = 40)
    @Column(nullable = false, length = 40, unique = true)
    private String username;

    @NotEmpty(message = "Password is empty!")
    @Size(min = 6, max = 50)
    @Column(length = 100)
    @JSONField(serialize = false)
    private String password;

    @NotEmpty(message = "Email is empty!")
    @Column(unique = true)
    private String email;

    private Long phoneNum;

    private Date birthday;

    private String label;

    public User(String username, String password, String email, Long phoneNum, Date birthday, String label) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNum = phoneNum;
        this.birthday = birthday;
        this.label = label;
    }

    public User() {

    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(Long phoneNum) {
        this.phoneNum = phoneNum;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
