import { socketSend } from "../app.js";
import { getUsername, checkMemberId } from "../common/common.js";

function createTask(projectId) {
    let name = $('#task-name').val();
    let content = $('#task-content').val();
    let ownerId = $('#task-owner').val()
    let requesterId = $('#task-requester').val()
    let start = $('#task-start').val()
    let end = $('#task-end').val()
    let complexity = $('#task-complex').val()

    let message = {"cmd": "createTask",
        "message": {"projectId": projectId, "name": name, "content": content, "ownerId": ownerId, "requesterId": requesterId, "start": start,
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

export { createTask, updateTask, deleteTask }