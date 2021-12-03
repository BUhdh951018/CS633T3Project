import { addMember, createTeam, deleteMember, deleteTeam } from "../action/teamAction.js";
import { getUser } from "../crud/userRepository.js";
import { memberInfo } from "../service/teamService.js";
import { getProjectById } from "../crud/projectRepository.js";
import { projectInfo } from "../service/projectService.js";

let team_page = $("#team-page")
let team_list = $('#team-list')
let member_list_head = $('#member-list-head')

$(document).ready(() => {
    // show team list
    team_page.delegate("#showTeamList", 'click', function () {
        $("#team-list").fadeIn()
        // todo change back color
        $(this).attr('src', '/static/images/caret-up-fill.svg').attr('id', 'closeTeamList')
    })
    // close team list
    team_page.delegate("#closeTeamList", 'click', function () {
        $("#team-list").hide()
        $(this).attr('src', '/static/images/caret-down-fill.svg').attr('id', 'showTeamList')
    })
    // show add team div
    team_page.delegate("#showAddTeamDiv", 'click', function () {
        $(this).attr('id', 'closeAddTeamDiv')
        $("#project").hide()
        $("#addTeamDiv").fadeIn()
        $("#addTeamDiv #project-username").empty().append(getUser().username)
        // todo change back color
    })
    // close add team div
    team_page.delegate("#closeAddTeamDiv", 'click', function () {
        $(this).attr('id', 'showAddTeamDiv')
        $("#addTeamDiv").hide()
        $("#project").fadeIn()
    })
    // create new team
    $("#createTeamBtn").click(() => {
        let name = $("#createTeamInput").val()
        createTeam(name)
        $('#closeAddTeamDiv').attr('id', 'showAddTeamDiv')
        $("#addTeamDiv").hide()
        $("#project").fadeIn()
    })
    // delete team
    team_page.delegate("#btnDeleteTeam", 'click', function () {
        let teamId = $(this).parent().attr('teamid')
        deleteTeam(teamId)
    })
    //show add member div
    member_list_head.delegate('#showAddMemberDiv', 'click', function () {
        $(this).attr('id', 'closeAddMemberDiv')
        $('#addMemberDiv').fadeIn()
    })
    // close add member div
    member_list_head.delegate('#closeAddMemberDiv', 'click', function () {
        $(this).attr('id', 'showAddMemberDiv')
        $('#addMemberDiv').hide()
    })
    // add member
    $('#addMemberBtn').click(() => {
        let memberId = $('#addMemberInput').val()
        addMember(memberId, $('#member-list').attr('teamid'))
        $('#closeAddMemberDiv').attr('id', 'showAddMemberDiv')
        $('#addMemberDiv').hide()
    })
    //delete member
    $('#member-list').delegate('#btnDeleteMember', 'click', function () {
        let teamId = $('#member-list').attr('teamid')
        deleteMember(teamId, $(this).attr('userid'))
        memberInfo(teamId)
    })
    // select project
    team_list.delegate('li div', 'click', function () {
        let id = $(this).parent().attr('projectid')
        projectInfo(id)
        let teamId = getProjectById(id).teamId
        memberInfo(teamId)
        $('#updateProjectDiv').hide()
        $('#addTeamDiv').hide()
        $('#addProjectDiv').hide()
        $('#task-table').hide()
        $('#project').fadeIn()
        $('#add-task-btn').fadeIn()
        $('#member-list-head').fadeIn()
    })
})