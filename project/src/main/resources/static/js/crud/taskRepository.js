import { updateProjectInfo } from "./projectRepository.js";

let taskArray = []
let task, currentTask, flag

function saveTaskInfo(tasks) {
    tasks.forEach(element => {
        taskArray.push(element)
    })
}

function getAllTask() {
    return JSON.parse(sessionStorage.getItem('task'))
}

function getTaskById(id) {
    currentTask = null
    task = getAllTask()
    task.forEach(element => {
        if (element.taskId === Number(id)) {
            currentTask = element
        }
    })

    return currentTask
}

function getTaskByProjectId(id) {
    currentTask = []
    task = getAllTask()
    task.forEach(element => {
        if (element.projectId === Number(id)) {
            currentTask.push(element)
        }
    })

    return currentTask
}

// create/update task
// argument: task content
function updateTaskInfo(content) {
    let taskId = content.taskId
    task = getAllTask()
    if (checkTask(taskId)) {
        task = task.filter(element => element.taskId !== taskId)
    }
    task.push(content)
    updateProjectInfo(content, "task")
    sessionStorage.setItem('task', JSON.stringify(task))
}

// delete task
// argument: task id
function deleteTaskById(id) {
    task = getAllTask()
    task = task.filter(element => element.taskId !== Number(id))
    updateProjectInfo(getTaskById(id), "deleteTask")
    sessionStorage.setItem('task', JSON.stringify(task))
}

// delete team/project => delete task
// argument: project id
function deleteTaskByProjectId(id) {
    task = getAllTask()
    task = task.filter(element => element.projectId !== Number(id))
    sessionStorage.setItem('task', JSON.stringify(task))
}

function checkTask(taskId) {
    flag = false
    task = getAllTask()
    task.forEach(element => {
        if (element.taskId === taskId) {
            flag = true
        }
    })

    return flag
}

export { saveTaskInfo, updateTaskInfo, deleteTaskById, deleteTaskByProjectId }
export { getAllTask, getTaskById, getTaskByProjectId }
export { taskArray }