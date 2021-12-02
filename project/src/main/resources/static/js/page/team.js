import { createTeam, deleteTeam } from "../action/teamAction.js";
import { getUser } from "../crud/userRepository.js";

let team_page = $("#team-page")

$(document).ready(() => {
    team_page.delegate("#showTeamList", 'click', function () {
        $("#team-list").fadeIn()
        // todo change back color
        $(this).attr('src', '/static/images/caret-up-fill.svg').attr('id', 'closeTeamList')
    })

    team_page.delegate("#closeTeamList", 'click', function () {
        $("#team-list").hide()
        $(this).attr('src', '/static/images/caret-down-fill.svg').attr('id', 'showTeamList')
    })

    team_page.delegate("#showAddTeamDiv", 'click', function () {
        $(this).attr('id', 'closeAddTeamDiv')
        $("#project").hide()
        $("#addTeamDiv").fadeIn()
        $("#addTeamDiv #project-username").empty().append(getUser().username)
        // todo change back color
    })

    team_page.delegate("#closeAddTeamDiv", 'click', function () {
        $(this).attr('id', 'showAddTeamDiv')
        $("#addTeamDiv").hide()
        $("#project").fadeIn()
    })

    $("#createTeamBtn").click(() => {
        let name = $("#createTeamInput").val()
        createTeam(name)
        $("#addTeamDiv").hide()
        $("#project").fadeIn()
    })

    team_page.delegate("#btnDeleteTeam", 'click', function () {
        let teamId = $(this).parent().attr('teamid')
        deleteTeam(teamId)
    })
})