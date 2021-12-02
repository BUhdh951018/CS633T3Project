import { getUser } from "../crud/userRepository.js";

function logInfo(title, message) {
    console.group(title)
    console.log(message)
    console.groupEnd()
}

function getUsername() {
    return sessionStorage.getItem('username')
}

function getCorrectDate(date) {
    let month = date.getMonth() + 1
    let day = date.getDate()
    return date.getFullYear() + '-' + dateAppendZero(month) + '-' + dateAppendZero(day)
}

function dateAppendZero(date) {
    if (date < 10)
        return "0" + "" + date
    return date
}

export { logInfo, getUsername, getCorrectDate }