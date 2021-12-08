import { addMember, createTeam, deleteMember, deleteTeam } from "../action/teamAction.js";
import { getUser } from "../crud/userRepository.js";
import { memberInfo } from "../service/teamService.js";
import { getProjectById } from "../crud/projectRepository.js";
import { projectInfo } from "../service/projectService.js";
import { getTeamById } from "../crud/teamRepository.js";
import {
    changeBack, cleanProject, deleteItem, hideForNew, hideProject, hideTask,
    initShowAddMember, initShowAddProject, initShowAddTeam, showTask
} from "../common/common.js";

let team_page = $("#team-page")
let team_list = $('#team-list')
let member_list_head = $('#member-list-head')

$(document).ready(() => {
    // show team list
    team_page.delegate("#showTeamList", 'click', function () {
        $("#team-list").fadeIn()
        changeBack('team')
        $(this).attr('src', '/static/images/caret-up-fill.svg').attr('id', 'closeTeamList')
    })
    // close team list
    team_page.delegate("#closeTeamList", 'click', function () {
        team_list.hide()
        changeBack('')
        $(this).attr('src', '/static/images/caret-down-fill.svg').attr('id', 'showTeamList')
    })
    // show add team div
    team_page.delegate("#showAddTeamDiv", 'click', function () {
        $(this).attr('id', 'closeAddTeamDiv')
        changeBack('team')
        hideForNew('team')
        $('#task').fadeIn()
        $("#addTeamDiv").fadeIn()
        $("#addTeamDiv #project-username").empty().append(getUser().username)
    })
    // close add team div
    team_page.delegate("#closeAddTeamDiv", 'click', function () {
        initShowAddTeam()
        changeBack('')
        $("#project").fadeIn()
    })
    // create new team
    $("#createTeamBtn").click(() => {
        let name = $("#createTeamInput").val()
        createTeam(name)
        initShowAddTeam()
        $("#project").fadeIn()
    })
    // delete team
    team_page.delegate("#btnDeleteTeam", 'click', function () {
        let teamId = $(this).parent().attr('teamid')
        deleteItem(teamId, 'team')
        deleteTeam(teamId)
    })
    //show add member div
    member_list_head.delegate('#showAddMemberDiv', 'click', function () {
        $(this).attr('id', 'closeAddMemberDiv')
        $('#addMemberDiv').fadeIn()
    })
    // close add member div
    member_list_head.delegate('#closeAddMemberDiv', 'click', function () {
        initShowAddMember()
    })
    // add member
    $('#addMemberBtn').click(() => {
        let name = $('#addMemberInput').val()
        addMember(name, $('#member-list').attr('teamid'))
        initShowAddMember()
    })
    // delete member
    $('#member-list').delegate('#btnDeleteMember', 'click', function () {
        let teamId = $('#member-list').attr('teamid')
        let memberId = $(this).attr('userid')
        let flag = deleteSelf(memberId, teamId)
        deleteMember(teamId, memberId)
        if (!flag) {
            memberInfo(teamId)
        }
    })
    // select project
    team_list.delegate('li div', 'click', function () {
        let id = $(this).parent().attr('projectid')
        projectInfo(id)
        let teamId = getProjectById(id).teamId
        memberInfo(teamId)
        $('#memberListTeamName').empty().append(getTeamById(teamId).name)
        $('#memberListProjectName').empty().append($(this).text())
        initShowAddMember()
        hideProject()
        hideTask()
        $('#userInfo').hide()
        changeBack('team')
        $('#project').fadeIn()
        showTask()
    })

    // show user info
    $('#showAccount').click(() => {
        $('#project').hide()
        hideProject()
        $('#task').hide()
        changeBack('user')
        $('#userInfo').fadeIn()
    })
})

function deleteSelf(memberId, teamId) {
    let userId = getUser().id
    if (Number(memberId) === userId) {
        deleteItem(teamId, 'team')
        return true
    }

    return false
}