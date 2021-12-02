import { getCorrectDate, logInfo } from "../common/common.js";
import { getUser, saveUser } from "../crud/userRepository.js";

function userInfoService(success, body) {
    if (success) {
        saveUser(body)
        userInfo()
        logInfo('Message: user-info', body)
    }
}

function userInfo() {
    let user = getUser()
    $("#navbar-username").empty().append(user.username)
    $("#project-username").empty().append(user.username)
    $("#email").empty().val(user.email)
    $("#phone").empty().val(user.phone)
    let date = new Date(user.birthday)
    $("#birthday").empty().val(getCorrectDate(date))
    $("#label").empty().val(user.label)
    $("#timeZone").empty().val('UTC' + (0 - new Date().getTimezoneOffset() / 60))
}

export { userInfoService }