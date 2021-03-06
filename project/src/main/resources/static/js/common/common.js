import { getUser } from "../crud/userRepository.js";
import { getMemberById, getMemberByName } from "../crud/teamRepository.js";

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

function checkMemberId(name, teamId) {
    let id = ''
    if (name !== null || name !== "" || name.length === 0) {
        id = getMemberByName(name, teamId).toString()
    }
    return id
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

function getQueryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// new team, new project
function hideForNew(type) {
    $("#project").hide()
    $('#userInfo').hide()
    hideTask()
    $('#taskDiv').hide()
    $('#memberListProjectName').empty().append('Project')
    if (type === 'team') {
        initShowAddProject()
        $('#member-list-head').hide()
        $('#member-list').empty()
        $('#memberListTeamName').empty().append('Team')
        initShowAddMember()
    } else {
        initShowAddTeam()
    }
}

function hideProject() {
    $('#updateProjectDiv').hide()
    initShowAddTeam()
    initShowAddProject()
}

function hideTask() {
    $('#task-table').hide()
    $('#addTaskDiv').hide()
    $('#updateTaskDiv').hide()
}

function showTask() {
    $('#task').fadeIn()
    $('#taskDiv').fadeIn()
    $('#member-list-head').fadeIn()
}

function deleteItem(teamId, type) {
    if (Number(teamId) === Number($('#member-list').attr('teamid'))) {
        $('#taskDiv').hide()
        $('#show-project-name').empty()
        $('#show-project-des').empty()
        $('#memberListProjectName').empty().append('Project')
        if (type === 'team') {
            $('#memberListTeamName').empty().append('Team')
            $('#member-list-head').hide()
            $('#member-list').empty()
        }
    }
}

function changeBack(type) {
    if (type === 'team') {
        $('#showAccount').removeClass('btn-change')
        $('#btnTeam').addClass('btn-change')
    } else if (type === 'user') {
        $('#btnTeam').removeClass('btn-change')
        $('#showAccount').addClass('btn-change')
    } else {
        $('#btnTeam').removeClass('btn-change')
        $('#showAccount').removeClass('btn-change')
    }
}

function initShowAddTeam() {
    $('#closeAddTeamDiv').attr('id', 'showAddTeamDiv')
    $("#addTeamDiv").hide()
}

function initShowAddProject() {
    $('#closeCreateProject').attr('id', 'showCreateProject')
    $("#addProjectDiv").hide()
}

function initShowAddMember() {
    $('#closeAddMemberDiv').attr('id', 'showAddMemberDiv')
    $('#addMemberDiv').hide()
}

function cleanProject(teamId) {
    if (teamId === Number($('#member-list').attr('teamid'))) {
        hideProject()
        hideTask()
    }
}

export { logInfo, getUsername, getCorrectDate, getQueryString }
export { checkMember, checkStatus, checkDate, checkComplex, checkMemberId }
export { hideForNew, hideProject, hideTask, showTask, changeBack }
export { initShowAddTeam, initShowAddProject, initShowAddMember }
export { cleanProject, deleteItem }