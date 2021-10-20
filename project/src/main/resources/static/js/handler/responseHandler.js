import { loginService } from "../service/loginService.js";
import { userService } from "../service/userService.js";

class responseHandler {
    constructor(cmd, success, message, body) {
        this._cmd = cmd;
        this._success = success
        this._message = message
        this._body = body
    }


    get cmd() {
        return this._cmd;
    }

    get success() {
        return this._success;
    }

    get message() {
        return this._message;
    }

    get body() {
        return this._body;
    }

    login(success, body) {
        loginService(success)
    }

    getUserInfo(success, body) {
        userService(success, body)
    }
}

export { responseHandler }