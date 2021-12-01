import { createTeam, deleteTeam } from "../action/teamAction.js";

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

    $("#showAddTeamDiv").click(() => {
        $("#project").hide()
        $("#addTeamDiv").fadeIn()
        // todo change back color
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