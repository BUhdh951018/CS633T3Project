import { socketSend } from "../app.js";

function getUserInfo() {
    let message = {"cmd": "getUserInfo", "message": {"username": sessionStorage.getItem('username')}};
    socketSend(message);

}

export { getUserInfo }