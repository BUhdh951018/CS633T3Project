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
 * Date: 2021/10/23 5:40 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Entity
@Data
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "team name is empty!")
    @Size(min = 3, max = 40)
    private String name;

    private Long ownerId;

    private String members = "";

    private String projects = "";

    public Team() {

    }

    public Team(String name, Long ownerId) {
        this.name = name;
        this.ownerId = ownerId;
    }

    public List<Long> getMemberList() {
        return StringBuilderUtil.stringToList(this.members);
    }

    public List<Long> getProjectList() {
        return StringBuilderUtil.stringToList(this.projects);
    }

    public void addMember(Long memberId) {
        this.setMembers(StringBuilderUtil.addElement(memberId, this.members));
    }

    public void deleteMember(Long memberId) {
        this.setMembers(StringBuilderUtil.deleteElement(memberId, this.members));
    }

    public void addProject(Long projectId) {
        this.setProjects(StringBuilderUtil.addElement(projectId, this.projects));
    }

    public void deleteProject(Long projectId) {
        this.setProjects(StringBuilderUtil.deleteElement(projectId, this.projects));
    }
}
