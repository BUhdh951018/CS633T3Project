import { socketSend } from "../app.js";
import { getUsername } from "../common/common.js";

function getUserInfo() {
    let message = {"cmd": "getUserInfo",
        "message": {"username": getUsername()}};
    socketSend(message);
}

function updateUserInfo() {
    let message = {"cmd": "updateUserInfo",
        "message": {"username": getUsername(), "email": "", "phoneNum": "", "birth": "", "label": ""}}
}

export { getUserInfo }