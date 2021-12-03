import { deleteTaskByProjectId, saveTaskInfo } from "./taskRepository.js";
import { addElement, deleteElement } from "../common/util.js";
import { updateTeamInfo } from "./teamRepository.js";

let projectArray = []
let project, currentProject, flag

function saveProjectInfo(projects) {
    projects.forEach(element => {
        projectArray.push(element)
        if (element.tasks.length !== 0) {
            saveTaskInfo(element.tasks)
        }
    })
}

function getAllProject() {
    return JSON.parse(sessionStorage.getItem('project'))
}

function getProjectByTeamId(id) {
    currentProject = []
    project = getAllProject()
    project.forEach(element => {
        if (element.teamId === Number(id)) {
            currentProject.push(element)
        }
    })

    return currentProject
}

function getProjectById(id) {
    currentProject = null
    project = getAllProject()
    project.forEach(element => {
        if (element.projectId === Number(id)) {
            currentProject = element
        }
    })

    return currentProject
}

// create/update project
function updateProjectInfo(content, title) {
    let projectId = Number(content.projectId)
    project = getAllProject()

    // create/update task
    if (title === 'task') {
        let taskId = Number(content.taskId)
        project.forEach(element => {
            if (element.projectId === projectId) {
                if (checkTaskInProject(taskId, projectId)) {
                    element.tasks = element.tasks.filter(element => element.taskId !== taskId)
                }
                element.tasks.push(content)
                updateTeamInfo(element, 'project')
            }
        })
    }

    if (title === 'deleteTask') {
        let taskId = Number(content.taskId)
        project.forEach(element => {
            if (element.projectId === projectId) {
                element.tasks = element.tasks.filter(element => element.taskId !== taskId)
                updateTeamInfo(element, 'project')
            }
        })
    }

    if (title === 'project') {
        if (checkProject(projectId)) {
            project = project.filter(element => element.projectId !== projectId)
        }
        project.push(content)
        updateTeamInfo(content, "project")
    }

    sessionStorage.setItem('project', JSON.stringify(project))
}

function deleteProjectById(id) {
    project = getAllProject()
    console.log(getProjectById(id))
    let content = {"projectId": id, "teamId": getProjectById(id).teamId}
    updateTeamInfo(content, "deleteProject")
    deleteTaskByProjectId(id)
    project = project.filter(element => element.projectId !== Number(id))
    sessionStorage.setItem('project', JSON.stringify(project))
}

function deleteProjectByTeamId(id) {
    project = getAllProject()
    project.forEach(element => {
        if (element.teamId === Number(id)) {
            deleteTaskByProjectId(element.projectId)
        }
    })
    project = project.filter(element => element.teamId !== id)
    sessionStorage.setItem('project', JSON.stringify(project))
}

function checkProject(projectId) {
    flag = false
    project = getAllProject()
    project.forEach(element => {
        if (element.projectId === projectId) {
            flag = true
        }
    })
    return flag
}

function checkTaskInProject(taskId, projectId) {
    flag = false
    let project = getProjectById(projectId)
    project.tasks.forEach(element => {
        if (element.id === taskId) {
            flag = true
        }
    })
    return flag
}

export { saveProjectInfo, getAllProject, getProjectByTeamId, getProjectById }
export { updateProjectInfo, deleteProjectById, deleteProjectByTeamId }
export { projectArray }