package com.cs633.project.db.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * Name: Donghang He
 * Date: 2021/10/25 3:26 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Entity
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "name is empty!")
    @Size(min = 3, max = 40)
    private String name;

    private Long projectId;

    private String content;

    private Long ownerId;

    private Long requesterId;

    private Date start;

    private Date end;

    private Integer complexity;

    private Integer status = 0;

    public Task() {
    }

    public Task(String name, Long projectId, String content, Long ownerId, Long requesterId,
                Date start, Date end, Integer complexity) {
        this.name = name;
        this.projectId = projectId;
        this.content = content;
        this.ownerId = ownerId;
        this.requesterId = requesterId;
        this.start = start;
        this.end = end;
        this.complexity = complexity;
    }
}
