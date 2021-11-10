import { socketSend } from "../app.js";

function createProject() {
    let name;
    let teamId;
    let description;
    let message = {"cmd": "createProject",
        "message": {"name": name, "teamId": teamId, "description": description,
            "username": sessionStorage.getItem('username')}}
    socketSend(message)
}

function getProjectInfo() {
    let projectId;
    let message = {"cmd": "getProjectInfo",
        "message": {"projectId": projectId}}
    socketSend(message)
}

function updateProject() {
    let projectId;
    let name;
    let description;
    let message = {"cmd": "updateProject",
        "message": {"projectId": projectId, "name": name, "description": description,
            "username": sessionStorage.getItem('username')}}
    socketSend(message)
}

function deleteProject() {
    let projectId;
    let message = {"cmd": "deleteProject",
        "message": {"projectId": projectId, "username": sessionStorage.getItem('username')}}
    socketSend(message)
}

export { createProject, getProjectInfo, updateProject, deleteProject }