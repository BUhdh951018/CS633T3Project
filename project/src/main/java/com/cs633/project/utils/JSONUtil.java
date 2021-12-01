package com.cs633.project.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.db.entity.Project;
import com.cs633.project.db.entity.Task;
import com.cs633.project.db.entity.Team;
import com.cs633.project.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.Optional;

/**
 * Name: Donghang He
 * Date: 2021/10/6 7:59 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
public class JSONUtil {

    @Autowired
    private IDataBus dataBus1;

    private static IDataBus dataBus;

    @PostConstruct
    public void init() {
        dataBus = dataBus1;
    }

    public static JSONObject createJSON(String cmd, boolean success, String message, Object body) {
        JSONObject object = new JSONObject();
        object.put("cmd", cmd);
        object.put("success", success);
        object.put("message", message);
        object.put("body", body);
        return object;
    }

    public static JSONObject createUser(User user) {
        JSONObject object = new JSONObject();
        object.put("username", user.getUsername());
        object.put("email", user.getEmail());
        object.put("phone", user.getPhoneNum());
        object.put("birthday", user.getBirthday());
        object.put("label", user.getLabel());
        return object;
    }

    public static JSONObject createTeam(Team team) {
        JSONObject object = new JSONObject();
        object.put("teamId", team.getId());
        object.put("name", team.getName());
        object.put("ownerId", team.getOwnerId());

        JSONArray members = new JSONArray();
        if (team.getMemberList() != null) {
            for (Long memberId : team.getMemberList()) {
                Optional<User> user = dataBus.userRepository().findById(memberId);
                if (user.isPresent()) {
                    members.add(createUser(user.get()));
                }
            }
        }
        object.put("members", members);

        JSONArray projects = new JSONArray();
        if (team.getProjectList() != null) {
            for (Long projectId : team.getProjectList()) {
                Optional<Project> project = dataBus.projectRepository().findById(projectId);
                if (project.isPresent()) {
                    projects.add(createProject(project.get()));
                }
            }
        }
        object.put("projects", projects);
        return object;
    }

    public static JSONObject createProject(Project project) {
        JSONObject object = new JSONObject();
        object.put("projectId", project.getId());
        object.put("name", project.getName());
        object.put("teamId", project.getTeamId());
        object.put("description", project.getDescription());

        JSONArray tasks = new JSONArray();
        if (project.getTaskList() != null) {
            for (Long taskId : project.getTaskList()) {
                Optional<Task> task = dataBus.taskRepository().findById(taskId);
                if (task.isPresent()) {
                    tasks.add(task.get());
                }
            }
        }
        object.put("tasks", tasks);
        return object;
    }

    public static JSONObject createTask(Task task) {
        JSONObject object = new JSONObject();
        object.put("taskId", task.getId());
        object.put("name", task.getName());
        object.put("content", task.getContent());
        object.put("start", task.getStart());
        object.put("end", task.getEnd());
        object.put("projectId", task.getProjectId());
        object.put("complexity", task.getComplexity());
        object.put("status", task.getStatus());
        Optional<User> owner = dataBus.userRepository().findById(task.getOwnerId());
        if (owner.isPresent()) {
            object.put("owner", createUser(owner.get()));
        } else {
            object.put("owner", "");
        }

        Optional<User> requester = dataBus.userRepository().findById(task.getRequesterId());
        if (requester.isPresent()) {
            object.put("requester", createUser(requester.get()));
        } else {
            object.put("requester", "");
        }
        return object;
    }

    // delete team, delete project, delete task
    public static JSONObject deleteItem(Long id) {
        JSONObject object = new JSONObject();
        object.put("id", id);
        return object;
    }
}
