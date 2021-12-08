import { socketSend } from "../app.js";
import { getUsername, checkMemberId } from "../common/common.js";

function createTask(projectId) {
    let name = $('#task-name').val();
    let content = $('#task-content').val();
    let teamId = $('#member-list').attr('teamid')
    let owner = $('#task-owner').val()
    let ownerId = checkMemberId(owner, teamId)
    let requester = $('#task-requester').val()
    let requesterId = checkMemberId(requester, teamId)
    let start = $('#task-start').val()
    let end = $('#task-end').val()
    let complexity = $('#task-complex').val()

    let message = {"cmd": "createTask",
        "message": {"projectId": projectId, "name": name, "content": content, "ownerId": ownerId,
            "requesterId": requesterId, "start": start,
            "end": end, "complexity": complexity, "username": getUsername()}}
    socketSend(message)
}

function updateTask(taskId, teamId) {
    let table = $('#update-table')
    let owner = table.find('#owner').val()
    owner = checkMemberId(owner, teamId)

    let message = {"cmd": "updateTask",
        "message": {"taskId": taskId, "name": table.find('#name').val(),
            "content": table.find('#content').val(), "ownerId": owner,
            "start": table.find('#start').val(), "end": table.find('#end').val(),
            "complexity": table.find('#complexity').val(), "username": getUsername()}}
    socketSend(message)
}

function deleteTask(taskId) {
    let message = {"cmd": "deleteTask",
        "message": {"taskId": taskId, "username": getUsername()}}
    socketSend(message)
}

function updateTaskStatus(taskId, content) {
    let status = Number(content) + 1
    let message = {"cmd": "updateTaskStatus",
        "message": {"taskId": taskId, "username": getUsername(), "status": status}}
    socketSend(message)
}

export { createTask, updateTask, deleteTask, updateTaskStatus }