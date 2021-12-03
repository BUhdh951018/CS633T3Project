import { getUser } from "../crud/userRepository.js";
import { getMemberById } from "../crud/teamRepository.js";

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

function checkMember(teamId, content) {
    let name = ''
    if (content !== undefined) {
        name = getMemberById(teamId, content)
    }
    return name
}

function checkDate(content) {
    let date = ''
    if (content !== undefined) {
        date = new Date(content)
        date = getCorrectDate(date)
    }
    return date
}

function checkComplex(content) {
    let complex = ''
    if (content !== undefined) {
        complex = getComplexColor(content)
    }
    return complex
}

function checkStatus(content) {
    let type, title
    if (content === 0) {
        type = 'btn-secondary'
        title = 'start'
    }
    if (content === 1) {
        type = 'btn-primary'
        title = 'finish'
    }
    if (content === 2) {
        type = 'btn-success'
        title = 'finished'
    }
    return "<button id='btnUpdateStatus' value='" + content +"' class='btn " + type + "'>" + title + "</button>"
}

function getComplexColor(complex) {
    let type
    if (complex === 1) {
        type = 'btn-primary'
        return "<button class='btn " + type + "'>" + complex + " point</button>"
    }
    if (complex === 2) {
        type = 'btn-success'
    }
    if (complex === 3) {
        type = 'btn-warning'
    }
    if (complex === 4) {
        type = 'btn-danger'
    }
    return "<button class='btn " + type + "'>" + complex + " points</button>"
}

export { logInfo, getUsername, getCorrectDate }
export { checkMember, checkStatus, checkDate, checkComplex }