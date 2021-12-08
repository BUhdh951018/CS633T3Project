import { createProject, deleteProject, updateProject } from "../action/projectAction.js";
import { getUser } from "../crud/userRepository.js";
import { cleanProject, hideForNew, initShowAddProject, showTask } from "../common/common.js";
import { getTeamById } from "../crud/teamRepository.js";
import { memberInfo } from "../service/teamService.js";
import { getProjectById } from "../crud/projectRepository.js";

let div = $("#addProjectDiv")
let team_page = $("#team-page")
let update = $('#updateProjectDiv')

$(document).ready(() => {
    // show create project div
    team_page.delegate("#showCreateProject", 'click', function () {
        $(this).attr('id', 'closeCreateProject')
        let teamId = $(this).parent().attr('teamId')
        div.attr('teamId', teamId)
        hideForNew('project')
        $("#addProjectDiv").fadeIn()
        $('#task').fadeIn()
        $("#addProjectDiv #project-username").empty().append(getUser().username)
        $('#memberListTeamName').empty().append(getTeamById(teamId).name)
        memberInfo(teamId)
    })
    // close create project div
    team_page.delegate("#closeCreateProject", 'click', function () {
        initShowAddProject()
        $("#project").fadeIn()
    })
    // create new project
    $("#createProjectBtn").click(() => {
        let name = $("#createProjectName").val()
        let des = $("#createProjectDes").val()
        let teamId = div.attr('teamid')
        createProject(name, des, teamId)
        initShowAddProject()
        $("#project").fadeIn()
        showTask()
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
        cleanProject(getProjectById(id).teamId)
        deleteProject(id)
    })
})