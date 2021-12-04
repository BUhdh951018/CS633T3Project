package com.cs633.project.service.inter;

import com.alibaba.fastjson.JSONObject;
import com.cs633.project.db.entity.User;

import java.util.Date;

/**
 * Name: Donghang He
 * Date: 2021/10/27 4:47 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public interface ITaskService {

    JSONObject createTask(User user, Long projectId, String name, String content, Long ownerId, Long requesterId,
                          Date start, Date end, Integer complexity);
    JSONObject updateTask(User user, Long taskId, String name, String content, Long ownerId, Long requesterId,
                          Date start, Date end, Integer complexity);
    JSONObject deleteTask(User user, Long taskId);

    JSONObject updateTaskStatus(User user, Long taskId, Integer status);
}
