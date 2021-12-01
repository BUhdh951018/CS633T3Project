import { createTeam } from "../action/teamAction.js";

$(document).ready(() => {
    $("#showTeamList").click(() => {
        $("#team-list").fadeIn()
    })

    $("#showAddTeamDiv").click(() => {
        $("#project").hide()
        $("#addTeamDiv").fadeIn()
    })

    $("#createTeamBtn").click(() => {
        let name = $("#createTeamInput").val()
        createTeam(name)
        $("#addTeamDiv").hide()
        $("#project").fadeIn()
    })
})