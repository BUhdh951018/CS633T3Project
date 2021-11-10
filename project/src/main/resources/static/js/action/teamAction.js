import { socketSend } from "../app.js";

function createTeam() {
    let name;
    let message = {"cmd": "createTeam",
        "message": {"name": name, "username": sessionStorage.getItem('username')}};
    socketSend(message)
}

function getTeamInfo() {
    let message = {"cmd": "getTeamInfo",
        "message": {"username": sessionStorage.getItem('username')}}
    socketSend(message)
}

function deleteTeam() {
    let teamId;
    let message = {"cmd": "deleteTeam",
        "message": {"teamId": teamId, "username": sessionStorage.getItem('username')}}
    socketSend(message)
}

function addMember() {
    let teamId;
    let memberId;
    let message = {"cmd": "addMember",
        "message": {"teamId": teamId, "memberId": memberId, "username": sessionStorage.getItem('username')}}
    socketSend(message)
}

function deleteMember() {
    let teamId;
    let memberId;
    let message = {"cmd": "deleteMember",
        "message": {"teamId": teamId, "memberId": memberId, "username": sessionStorage.getItem('username')}}
    socketSend(message)
}

export { createTeam, getTeamInfo, deleteTeam, addMember, deleteMember }