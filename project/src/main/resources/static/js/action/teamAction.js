import { socketSend } from "../app.js";
import { getUsername } from "../common/common.js";

function createTeam(name) {
    let message = {"cmd": "createTeam",
        "message": {"name": name, "username": getUsername()}};
    socketSend(message)
}

function getTeamInfo() {
    let message = {"cmd": "getTeamInfo",
        "message": {"username": getUsername()}}
    socketSend(message)
}

function deleteTeam(teamId) {
    let message = {"cmd": "deleteTeam",
        "message": {"teamId": teamId, "username": getUsername()}}
    socketSend(message)
}

function addMember(name, teamId) {
    let message = {"cmd": "addMember",
        "message": {"teamId": teamId, "memberName": name, "username": getUsername()}}
    socketSend(message)
}

function deleteMember(teamId, memberId) {
    let message = {"cmd": "deleteMember",
        "message": {"teamId": teamId, "memberId": memberId, "username": getUsername()}}
    socketSend(message)
}

export { createTeam, getTeamInfo, deleteTeam, addMember, deleteMember }