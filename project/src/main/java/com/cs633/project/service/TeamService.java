package com.cs633.project.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.constant.CommonConstant;
import com.cs633.project.db.entity.Team;
import com.cs633.project.db.entity.User;
import com.cs633.project.message.Response;
import com.cs633.project.service.inter.ITeamService;
import com.cs633.project.utils.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Name: Donghang He
 * Date: 2021/10/23 5:55 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
public class TeamService implements ITeamService {

    @Autowired
    private IDataBus dataBus;

    @Override
    public JSONObject createTeam(User user, String name) {
        Long userId = user.getId();
        Team team = new Team(name, userId);
        team.addMember(userId);
        team = dataBus.teamRepository().save(team);
        user.addTeam(team.getId());
        dataBus.userService().updateUser(user);
        return Response.sendBody("createTeam", JSONUtil.createTeam(team));
    }

    @Override
    public JSONObject getTeamInfo(User user) {
        JSONArray teams = new JSONArray();
        if (user.getTeamList() != null) {
            for (Long teamId : user.getTeamList()) {
                Optional<Team> team = dataBus.teamRepository().findById(teamId);
                if (team.isPresent()) {
                    teams.add(JSONUtil.createTeam(team.get()));
                }
            }
        }
        return Response.sendBody("getTeamInfo", teams);
    }

    @Override
    public JSONObject deleteTeam(User user, Long teamId) {
        Optional<Team> optionalTeam = dataBus.teamRepository().findById(teamId);
        if (optionalTeam.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_TEAM_NOT_EXIST, "deleteTeam");
        }
        Team team = optionalTeam.get();
        if (!team.getOwnerId().equals(user.getId())) {
            return Response.sendErrorMessage(CommonConstant.ERROR_PERMISSION_DENIED, "deleteTeam",
                    "not team owner");
        }

        for (Long id : team.getMemberList()) {
            Optional<User> optionalUser = dataBus.userRepository().findById(id);
            if (optionalUser.isEmpty()) {
                return Response.sendErrorMessage(CommonConstant.ERROR_MEMBER_EMPTY, "deleteTeam");
            }
            User member = optionalUser.get();
            member.deleteTeam(teamId);
            dataBus.userRepository().save(member);
        }
        dataBus.teamRepository().delete(team);
        return Response.sendBody("deleteTeam", JSONUtil.deleteItem(teamId));
    }

    @Override
    public JSONObject addMember(User user, Long teamId, String memberName) {
        User member = dataBus.userRepository().findByUsername(memberName);
        if (member == null) {
            return Response.sendErrorMessage(CommonConstant.ERROR_ADD_MEMBER, "addMember",
                    "member not exist");
        }

        if (member.getId().equals(user.getId())) {
            return Response.sendErrorMessage(CommonConstant.ERROR_ADD_MEMBER, "addMember",
                    "can't add yourself");
        }

        Optional<Team> optionalTeam = dataBus.teamRepository().findById(teamId);
        if (optionalTeam.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_ADD_MEMBER, "addMember",
                    "team not exist");
        }

        Team team = optionalTeam.get();
        if (isMember(member, team)) {
            return Response.sendErrorMessage(CommonConstant.ERROR_ADD_MEMBER, "addMember",
                    "already been member");
        }

        member.addTeam(teamId);
        dataBus.userRepository().save(member);
        team.addMember(member.getId());
        team = dataBus.teamRepository().save(team);
        return Response.sendBody("addMember", JSONUtil.createTeam(team));
    }

    @Override
    public JSONObject deleteMember(User user, Long teamId, Long memberId) {
        Optional<User> optionalMember = dataBus.userRepository().findById(memberId);
        if (optionalMember.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_DELETE_MEMBER, "deleteMember",
                    "member not exist");
        }

        Optional<Team> optionalTeam = dataBus.teamRepository().findById(teamId);
        if (optionalTeam.isEmpty()) {
            return Response.sendErrorMessage(CommonConstant.ERROR_DELETE_MEMBER, "deleteMember",
                    "team not exist");
        }

        User member = optionalMember.get();

        Team team = optionalTeam.get();
        if (user.getId().equals(memberId)) {
            if (memberId.equals(team.getOwnerId())) {
                return Response.sendErrorMessage(CommonConstant.ERROR_PERMISSION_DENIED, "deleteMember",
                        "you are team owner can't delete yourself");
            }
        }

        if (!user.getId().equals(team.getOwnerId())) {
            if (!user.getId().equals(memberId)) {
                return Response.sendErrorMessage(CommonConstant.ERROR_PERMISSION_DENIED, "deleteMember",
                        "you are not the owner of the team, can't delete other member");
            }
        }

        if (!isMember(member, team)) {
            return Response.sendErrorMessage(CommonConstant.ERROR_DELETE_MEMBER, "deleteMember",
                    "member not exist in this team");
        }

        member.deleteTeam(teamId);
        dataBus.userRepository().save(member);
        team.deleteMember(memberId);
        team = dataBus.teamRepository().save(team);

        if (user.getId().equals(memberId)) {
            return Response.sendBody("deleteTeam", JSONUtil.deleteItem(teamId));
        }

        return Response.sendBody("deleteMember", JSONUtil.createTeam(team));
    }

    @Override
    public Boolean isMember(User member, Team team) {
        return team.getMembers().contains(member.getId().toString())
                && member.getTeams().contains(team.getId().toString());
    }

}
