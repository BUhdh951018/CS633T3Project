package com.cs633.project.service.inter;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.db.entity.User;

/**
 * Name: Donghang He
 * Date: 2021/10/23 5:55 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public interface ITeamService {

    JSONObject createTeam(User user, String name);

    JSONObject getTeamInfo(User user);
}
