import { deleteProjectByTeamId, projectArray, saveProjectInfo } from "./projectRepository.js";
import { taskArray } from "./taskRepository.js";
import { addElement, deleteElement } from "../common/util.js";

let teamArray, currentTeam, team, flag

function saveTeamInfo(teams) {
    teamArray = []
    teams.forEach(element => {
        teamArray.push(element)
        if (element.projects.length !== 0) {
            saveProjectInfo(element.projects)
        }
    })

    sessionStorage.setItem('team', JSON.stringify(teamArray))
    sessionStorage.setItem('project', JSON.stringify(projectArray))
    sessionStorage.setItem('task', JSON.stringify(taskArray))
}

function getAllTeam() {
    return JSON.parse(sessionStorage.getItem('team'))
}

function getTeamById(id) {
    currentTeam = null
    team = getAllTeam()
    team.forEach(element => {
        if (element.teamId === Number(id)) {
            currentTeam = element
        }
    })

    return currentTeam
}

function updateTeamInfo(content, title) {
    team = getAllTeam()
    let id = content.teamId
    if (title === 'team') {
        if (checkTeam(id)) {
            team = team.filter(element => element.teamId !== id)
        }
        team.push(content)
    }

    if (title === 'createProject') {
        team.forEach(element => {
            if (element.teamId === id) {
                let projects = element.projects
                element.projects = addElement(content.projectId, projects)
            }
        })
    }

    if (title === 'deleteProject') {
        team.forEach(element => {
            if (element.teamId === id) {
                let projects = element.projects
                element.projects = deleteElement(content.projectId, projects)
            }
        })
    }

    sessionStorage.setItem('team', JSON.stringify(team))
}

function deleteTeamById(id) {
    team = getAllTeam()
    team = team.filter(element => element.teamId !== id)
    deleteProjectByTeamId(id)
    sessionStorage.setItem('team', JSON.stringify(team))
}

function checkTeam(id) {
    flag = false
    team = getAllTeam()
    team.forEach(element => {
        if (element.teamId === Number(id)) {
            flag = true
        }
    })

    return flag
}

export { saveTeamInfo }
export { getAllTeam, getTeamById }
export { updateTeamInfo, deleteTeamById }