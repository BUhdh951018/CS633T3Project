import { getUserInfo } from "../action/userAction.js"
import { getTeamInfo } from "../action/teamAction.js";

let array = []

function loginService(success) {
    if (success) {
        setSession()
        loginSuccess()
    }
}

function loginSuccess() {
    $("#login-page").hide()
    $("#team-page").fadeIn()
    getUserInfo()
    //getTeamInfo()
}

function setSession() {
    sessionStorage.setItem('user', JSON.stringify(array))
    sessionStorage.setItem('team', JSON.stringify(array))
    sessionStorage.setItem('project', JSON.stringify(array))
    sessionStorage.setItem('task', JSON.stringify(array))
}　

export { loginService }