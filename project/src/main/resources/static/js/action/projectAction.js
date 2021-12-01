import { socketSend } from "../app.js";
import { getUsername } from "../common/common.js";

function createProject(name, des, teamId) {
    let message = {"cmd": "createProject",
        "message": {"name": name, "teamId": teamId, "description": des,
            "username": getUsername()}}
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
            "username": getUsername()}}
    socketSend(message)
}

function deleteProject() {
    let projectId;
    let message = {"cmd": "deleteProject",
        "message": {"projectId": projectId, "username": getUsername()}}
    socketSend(message)
}

export { createProject, getProjectInfo, updateProject, deleteProject }