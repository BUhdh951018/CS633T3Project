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
        logInfo('Message: update task', body)
    }
}

function deleteTaskService(success, body) {
    if (success) {
        deleteTaskById(body)
        setCurrentProject()
        logInfo('Message: delete task', getAllTask())
    }
}

function taskList(task) {
    task_list.empty();
    let i = 1
    task.forEach(element => {
        task_list.append(
            "<button taskid='" + element.taskId +"' id='showAddTask' class='task-btn btn'>"
            + "<img class='task-icon' src='/static/images/card-checklist.svg' alt=''>"
            + "<br>"
            + "Task" + i
            + "<br>"
            + element.name
            + "</button>"
        )
        i++
    })
}

function taskInfo(task, project) {
    task_table.empty();
    setTaskInit()
    start = checkDate(task.start)
    end = checkDate(task.end)
    owner = checkMember(project.teamId, task.ownerId)
    requester = checkMember(project.teamId, task.requesterId)
    complex = checkComplex(task.complexity)
    status = checkStatus(task.status)
    task_table.append("<tr taskid='" + task.id + "'>" +
        "<td>" + task.name +
        "<img id='btnTaskOperate' class='list-icon' src='/static/images/pencil-fill.svg' alt=''></td>" +
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

export { taskService, updateTaskService, deleteTaskService }
export { taskInfo, taskList }