import { createProject } from "../action/projectAction.js";
import { getUser } from "../crud/userRepository.js";

let div = $("#addProjectDiv")
let team_page = $("#team-page")

$(document).ready(() => {
    team_page.delegate("#showCreateProject", 'click', function () {
        $(this).attr('id', 'closeCreateProject')
        div.attr('teamId', $(this).parent().attr('teamId'))
        $("#project").hide()
        $("#addProjectDiv").fadeIn()
        $("#addProjectDiv #project-username").empty().append(getUser().username)

    })

    team_page.delegate("#closeCreateProject", 'click', function () {
        div.hide()
        $(this).attr('id', 'showCreateProject')
        $("#project").fadeIn()
    })

    $("#createProjectBtn").click(() => {
        let name = $("#createProjectName").val()
        let des = $("#createProjectDes").val()
        let teamId = div.attr('teamid')
        createProject(name, des, teamId)
        div.hide()
        $("#closeCreateProject").attr('id', 'showCreateProject')
        $("#project").fadeIn()
    })
})