import { logInfo } from "../common/common.js";


function userService(success, body) {
    if (success) {
        userInfo(body)
        logInfo('Message: user-info', body)
    }
}

function userInfo(body) {

}

export { userService }