package com.cs633.project.db.entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import com.alibaba.fastjson.annotation.JSONField;
import com.cs633.project.utils.StringBuilderUtil;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Name: Donghang He
 * Date: 2021/9/27 9:44 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Entity
@Data
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

    private String teams = "";

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

    public List<Long> getTeamList() {
        return StringBuilderUtil.stringToList(this.teams);
    }

    public void addTeam(Long teamId) {
        this.setTeams(StringBuilderUtil.addElement(teamId, this.teams));
    }

    public void deleteTeam(Long teamId) {
        this.setTeams(StringBuilderUtil.deleteElement(teamId, this.teams));
    }
}
