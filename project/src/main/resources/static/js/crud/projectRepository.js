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
    currentProject = []
    project = getAllProject()
    project.forEach(element => {
        if (element.projectId === Number(id)) {
            currentProject.push(element)
        }
    })

    return currentProject
}

// create/update project
function updateProjectInfo(content, title) {
    let projectId = Number(content.projectId)
    project = getAllProject()

    if (title === 'createTask') {
        project.forEach(element => {
            if (element.projectId === projectId) {
                let tasks = element.tasks
                element.tasks = addElement(content.taskId, tasks)
            }
        })
    }

    if (title === 'deleteTask') {
        project.forEach(element => {
            if (element.projectId === projectId) {
                let tasks = element.tasks
                element.tasks = deleteElement(content.taskId, tasks)
            }
        })
    }

    if (title === 'project') {
        if (checkProject(projectId)) {
            project = project.filter(element => element.projectId !== projectId)
        } else {
            let temp = {"projectId": projectId, "teamId": content.teamId}
            updateTeamInfo(temp, "createProject")
        }
        project.push(content)
    }

    sessionStorage.setItem('project', JSON.stringify(project))
}

function deleteProjectById(id) {
    project = getAllProject()
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

export { saveProjectInfo, getAllProject, getProjectByTeamId, getProjectById }
export { updateProjectInfo, deleteProjectById, deleteProjectByTeamId }
export { projectArray }