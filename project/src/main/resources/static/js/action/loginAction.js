import { socketSend } from "../app.js";

$(document).ready(() => {
    $("#btnLogin").click(() => {
       login();
    });
})

function login() {
    let username = $("#username").val()
    sessionStorage.setItem('username', username)
    let info = {"username": username, "password": $("#password").val()};
    let message = {"cmd": "login", "message": info};
    socketSend(message);
}