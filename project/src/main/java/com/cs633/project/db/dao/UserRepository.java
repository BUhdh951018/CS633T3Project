package com.cs633.project.db.dao;

import com.cs633.project.db.entity.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Name: Donghang He
 * Date: 2021/9/27 10:15 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);

    User findByEmail(String email);

}
