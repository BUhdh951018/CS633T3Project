package com.cs633.project.service.inter;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.db.entity.User;

/**
 * Name: Donghang He
 * Date: 2021/10/27 4:46 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public interface IProjectService {

    JSONObject createProject(User user, Long teamId, String name, String description);
    JSONObject getProjectInfo(Long projectId);
    JSONObject updateProject(User user, Long projectId, String name, String description);
    JSONObject deleteProject(User user, Long projectId);
}
