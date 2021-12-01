import { createProject } from "../action/projectAction.js";

let div = $("#addProjectDiv")

$(document).ready(() => {
    $("#showAddProjectDiv").click(() => {
        div.attr('teamId', '')
        $("#project").hide()
        div.fadeIn()
    })

    $("#createProjectBtn").click(() => {
        let name = $("#createProjectName").val()
        let des = $("#createProjectDes").val()
        let teamId = div.attr('teamId')
        createProject(name, des, teamId)
        div.hide()
        $("#project").fadeIn()
    })
})