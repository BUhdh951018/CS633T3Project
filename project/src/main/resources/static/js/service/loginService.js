import { getUserInfo } from "../action/userAction.js"

function loginService(success) {
    if (success) {
        console.log("success")
        loginSuccess()
    }
}

function loginSuccess() {
    getUserInfo()
}　

export {loginService}