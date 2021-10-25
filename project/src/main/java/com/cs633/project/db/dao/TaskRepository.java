package com.cs633.project.db.dao;

import com.cs633.project.db.entity.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Name: Donghang He
 * Date: 2021/10/25 3:35 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public interface TaskRepository extends CrudRepository<Task, Long> {

}
