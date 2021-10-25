package com.cs633.project.db.entity;

import com.cs633.project.utils.StringBuilderUtil;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * Name: Donghang He
 * Date: 2021/10/25 3:20 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Entity
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long teamId;

    @NotEmpty(message = "project name is empty!")
    @Size(min = 3, max = 40)
    private String name;

    private String tasks = "";

    private String description;

    public Project() {

    }

    public Project(String name, Long teamId, String description) {
        this.name = name;
        this.teamId = teamId;
        this.description = description;
    }

    public List<Long> getTaskList() {
        return StringBuilderUtil.stringToList(this.tasks);
    }

    public void addTask(Long taskId) {
        this.setTasks(StringBuilderUtil.addElement(taskId, this.tasks));
    }

    public void deleteTask(Long taskId) {
        this.setTasks(StringBuilderUtil.deleteElement(taskId, this.tasks));
    }
}
