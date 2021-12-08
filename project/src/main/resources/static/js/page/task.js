import { createTask, deleteTask, updateTask, updateTaskStatus } from "../action/taskAction.js";
import { getMemberByTeamId, getMemberById } from "../crud/teamRepository.js";
import { getTaskById } from "../crud/taskRepository.js";
import { getProjectById } from "../crud/projectRepository.js";
import { taskInfo, taskList } from "../service/taskService.js";
import { getCorrectDate } from "../common/common.js";

let taskTable = $('#task-table')
let task_list = $('#task-list')
let updateTable = $('#update-table')

$(document).ready(() => {
    // show add task div
    $('#showAddTask').click(() => {
        $('#taskDiv').hide()
        let teamId = $('#member-list').attr('teamid')
        addOwnerRequester(getMemberByTeamId(teamId))
        $('#addTaskDiv').fadeIn()
    })
    // add task
    $('#btn-add-task').click(() => {
        let id = $('#show-project-name').attr('projectid')
        createTask(id)
        $('#addTaskDiv').hide()
        $('#taskDiv').fadeIn()
    })
    // show detail
    task_list.delegate('button', 'click', function () {
        let id = $(this).attr('taskid')
        let task = getTaskById(id)
        taskInfo(task, getProjectById(task.projectId))
        $('#task-table').fadeIn()
    })
    // show update div
    taskTable.delegate('#showUpdateTaskDiv', 'click', function () {
        $('#taskDiv').hide()
        $('#updateTaskDiv').fadeIn()
        let taskId = $(this).parent().parent().attr('taskid')
        updateTaskTable(taskId)
    })
    // update task
    $('#btnTaskUpdate').click(function () {
        let taskId = $('#update-table tr').attr('taskid')
        let teamId = $('#update-table tr').attr('teamid')
        updateTask(taskId, teamId)
        $('#updateTaskDiv').hide()
        $('#taskDiv').fadeIn()
    })
    // update status
    taskTable.delegate('#btnUpdateStatus', 'click', function () {
        let taskId = $(this).parent().parent().attr('taskid')
        let status = $(this).val()
        if (Number(status) < 2) {
            updateTaskStatus(taskId, status)
        }
    })
    // delete task
    taskTable.delegate('#btnTaskDelete', 'click', function () {
        let taskId = $(this).parent().parent().attr('taskid')
        deleteTask(taskId)
        taskTable.hide()
    })
})

$(document).ready(function () {
    // add task owner requester
    $('#owner-list').delegate('a', 'click', function () {
        $('#task-owner').val($(this).text());
    });
    $('#requester-list').delegate('a', 'click', function () {
        $('#task-requester').val($(this).text());
    });
    // task table search
    $('#my-input').on('keyup', function () {
        let value = $(this).val().toLowerCase();
        $("#my-table tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
})

// add task owner/requester select
function addOwnerRequester(members) {
    $("#owner-list").empty();
    $("#requester-list").empty();
    for (let i = 0; i < members.length; i++) {
        $('#owner-list').append('<li><a class="dropdown-item">' + members[i].username + '</a></li>');
        $('#requester-list').append('<li><a class="dropdown-item">' + members[i].username + '</a></li> ');
    }
}

// update task
function updateTaskTable(id) {
    let task = getTaskById(id)
    let teamId = getProjectById(task.projectId).teamId
    let owner = addOwner(task.owner.username)
    let start = new Date(task.start)
    let end = new Date(task.end)
    updateTable.empty()
    updateTable.append(updateColumnByType(task, teamId, owner, start, end))
}
// different update table for task
function updateColumnByType(task, teamId, owner, start, end) {
    let type = task.type
        return "<tr taskid='" + task.taskId + "' teamid='" + teamId + "'>"
            + "<td><input id='name' class=\"form-control\" value='" + task.name + "'/></td>"
            + "<td><input id='content' class=\"form-control\" value='" + task.content + "'/></td>"
            + "<td><select id='owner' class='custom-select'>" + owner + "</select></td>"
            + "<td><input id='start' class=\"form-control\" type='date' value='" + getCorrectDate(start) + "'/></td>"
            + "<td><input id='end' class=\"form-control\" type='date' value='" + getCorrectDate(end) + "'/></td>"
            + "<td><select id='complexity' class='custom-select'>" + changeComplex(task.complexity) + "</select>"
            + "</td>"
            + "</tr>"
}
// set complexity to select
function changeComplex(complex) {
    let row = "<option selected value='" + complex + "'>" + complex + " points</option>"
    for (let i = 1; i < 5; i++) {
        if (i === complex) {
            continue
        }
        let temp = "<option value='" + i + "'>" + i + " points</option>"
        row += temp
    }
    return row
}

// owner select
function addOwner(name) {
    let team_id = $('#member-list').attr('teamid');
    let member = getMemberByTeamId(team_id)
    let temp = "<option selected>Please select an owner</option>"
    if (name !== null) {
        temp = "<option selected>" + name + "</option>"
    }
    for (let i = 0; i < member.length; i++) {
        if (member[i].username === name) {
            continue
        }
        let row = "<option>" + member[i].username + "</option>"
        temp += row
    }
    return temp
}