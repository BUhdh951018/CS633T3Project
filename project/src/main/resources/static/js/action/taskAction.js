import { socketSend } from "../app.js";

function createTask() {
    let name;
    let content;
    let ownerId
    let requesterId
    let start
    let end
    let complexity

    let message = {"cmd": "createTask",
        "message": {"name": name, "content": content, "ownerId": ownerId, "requesterId": requesterId, "start": start,
            "end": end, "complexity": complexity, "username": sessionStorage.getItem('username')}}
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
            "start": start, "end": end, "complexity": complexity, "username": sessionStorage.getItem('username')}}
    socketSend(message)
}

function deleteTask() {
    let taskId
    let message = {"cmd": "deleteTask",
        "message": {"taskId": taskId, "username": sessionStorage.getItem('username')}}
    socketSend(message)
}

export { createTask, updateTask, deleteTask }