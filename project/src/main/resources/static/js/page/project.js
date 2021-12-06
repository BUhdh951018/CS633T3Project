import { createProject, deleteProject, updateProject } from "../action/projectAction.js";
import { getUser } from "../crud/userRepository.js";
import { hideForNew } from "../common/common.js";

let div = $("#addProjectDiv")
let team_page = $("#team-page")
let update = $('#updateProjectDiv')

$(document).ready(() => {
    // show create project div
    team_page.delegate("#showCreateProject", 'click', function () {
        $(this).attr('id', 'closeCreateProject')
        div.attr('teamId', $(this).parent().attr('teamId'))
        hideForNew('project')
        $("#addProjectDiv").fadeIn()
        $('#task').fadeIn()
        $("#addProjectDiv #project-username").empty().append(getUser().username)
    })
    // close create project div
    team_page.delegate("#closeCreateProject", 'click', function () {
        div.hide()
        $(this).attr('id', 'showCreateProject')
        $("#project").fadeIn()
    })
    // create new project
    $("#createProjectBtn").click(() => {
        let name = $("#createProjectName").val()
        let des = $("#createProjectDes").val()
        let teamId = div.attr('teamid')
        createProject(name, des, teamId)
        div.hide()
        $("#closeCreateProject").attr('id', 'showCreateProject')
        $("#project").fadeIn()
    })
    // show update project div
    $('#project').delegate('#btnUpdateProject', 'click', function () {
        $("#project").hide()
        let projectId = $(this).parent().attr('projectid')
        update.attr('projectid', projectId)
        update.fadeIn()
        $("#updateProjectDiv #project-username").empty().append(getUser().username)

    })
    // update project
    $('#updateProjectBtn').click(() => {
        let name = $('#updateProjectName').val()
        let des = $('#updateProjectDes').val()
        let id = update.attr('projectid')
        updateProject(name, des, id)
        update.hide()
        $('#project').fadeIn()
    })
    // delete project
    team_page.delegate('#btnDeleteProject', 'click', function () {
        let id = $(this).parent().attr('projectid')
        deleteProject(id)
        // todo hide info of delete project
    })
})