import { deleteTaskById, getAllTask, updateTaskInfo } from "../crud/taskRepository.js";
import { logInfo } from "../common/common.js";
import { setCurrentProject } from "./projectService.js";
import { checkDate, checkStatus,checkComplex, checkMember } from "../common/common.js";

let task_list = $('#task-list')
let task_table = $('#my-table')
let start, end, complex, owner, requester, status

function taskService(success, body) {
    if (success) {
        updateTaskInfo(body)
        setCurrentProject()
        logInfo('Message: create task', body)
    }
}

function updateTaskService(success, body) {
    if (success) {
        updateTaskInfo(body)
        setCurrentProject()
        taskInfo(body)
        logInfo('Message: update task', body)
    }
}

function deleteTaskService(success, body) {
    if (success) {
        deleteTaskById(body.id)
        setCurrentProject()
        logInfo('Message: delete task', getAllTask())
    }
}

function statusTaskService(success, body) {
    if (success) {
        updateTaskInfo(body)
        setCurrentProject()
        taskInfo(body)
        logInfo('Message: update status', body)
    }
}

function taskList(task) {
    task_list.empty();
    let i = 1
    task.forEach(element => {
        task_list.append(
            "<button taskid='" + element.taskId +"' id='showAddTask' class='task-btn btn'>"
            + "<img class='task-icon' src='/static/images/" + randomIcon(i) + ".svg' alt=''>"
            + "<br>"
            + "Task" + i
            + "<br>"
            + element.name
            + "</button>"
        )
        i++
    })
}

function randomIcon(i) {
    if (i % 4 === 0) {
        return 'bar-chart-line'
    } else if (i % 4 === 1) {
        return 'graph-up-arrow'
    } else if (i % 4 === 2) {
        return 'journal'
    } else {
        return 'layout-text-sidebar-reverse'
    }
}

function taskInfo(task) {
    task_table.empty();
    setTaskInit()
    start = checkDate(task.start)
    end = checkDate(task.end)
    owner = task.owner.username
    requester = task.requester.username
    complex = checkComplex(task.complexity)
    status = checkStatus(task.status)
    task_table.append("<tr taskid='" + task.taskId + "'>" +
        "<td>" + task.name +
        "<img id='showUpdateTaskDiv' class='team-icon' src='/static/images/pencil-fill.svg' alt=''>" +
        "<img id='btnTaskDelete' class='team-icon' src='/static/images/dash-circle.svg' alt=''></td>" +
        "<td>" + task.content + "</td>" +
        "<td>" + owner + "</td>" +
        "<td>" + requester + "</td>" +
        "<td>" + start + "</td>" +
        "<td>" + end + "</td>" +
        "<td>" + complex + "</td>" +
        "<td>" + status + "</td>" +
        "</tr>");
}

function setTaskInit() {
    complex = ''
    owner = ''
    requester = ''
}

export { taskService, updateTaskService, deleteTaskService, statusTaskService }
export { taskInfo, taskList }