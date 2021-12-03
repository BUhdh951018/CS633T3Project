import { socketSend } from "../app.js";
import { getUsername } from "../common/common.js";

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

function updateTask() {
    let taskId
    let name
    let content
    let ownerId
    let requesterId
    let start
    let end
    let complexity

    let message = {"cmd": "updateTask",
        "message": {"taskId": taskId, "name": name, "content": content, "ownerId": ownerId, "requesterId": requesterId,
            "start": start, "end": end, "complexity": complexity, "username": getUsername()}}
    socketSend(message)
}

function deleteTask(taskId) {
    let message = {"cmd": "deleteTask",
        "message": {"taskId": taskId, "username": getUsername()}}
    socketSend(message)
}

export { createTask, updateTask, deleteTask }