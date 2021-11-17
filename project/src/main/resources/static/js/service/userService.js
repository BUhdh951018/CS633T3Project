import { logInfo } from "../common/common.js";
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

}

export { userInfoService }