import { deleteProjectByTeamId, projectArray, saveProjectInfo } from "./projectRepository.js";
import { taskArray } from "./taskRepository.js";
import { addElement, deleteElement } from "../common/util.js";

let teamArray, currentTeam, team, flag
let userId, member, username

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

    if (title === 'project') {
        let projectId = Number(content.projectId)
        team.forEach(element => {
            if (element.teamId === id) {
                if (checkProjectInTeam(projectId, id)) {
                    element.projects = element.projects.filter(item => item.projectId !== projectId)
                }
                element.projects.push(content)
            }
        })
    }

    if (title === 'deleteProject') {
        let projectId = Number(content.projectId)
        team.forEach(element => {
            if (element.teamId === id) {
                element.projects = element.projects.filter(item => item.projectId !== projectId)
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

function getMemberByTeamId(id) {
    member = []
    team = getAllTeam()
    team.forEach(element => {
        if (element.teamId === Number(id)) {
            member = element.members
        }
    })
    return member
}

function getMemberByName(name, teamId) {
    userId = ''
    team = getAllTeam()
    team.forEach(element => {
        if (element.teamId === Number(teamId)) {
            element.members.forEach(member => {
                if (member.name === name.toString()) {
                    userId = member.id
                }
            })
        }
    })
    return userId
}

function getMemberById(teamId, id) {
    username = ''
    team = getAllTeam()
    team.forEach(element => {
        if (element.teamId === Number(teamId)) {
            element.members.forEach(member => {
                if (member.id === Number(id)) {
                    username = member.name
                }
            })
        }
    })
    return username
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

function checkProjectInTeam(projectId, teamId) {
    flag = false
    team = getAllTeam()
    team.forEach(element => {
        if (element.teamId === teamId) {
            element.projects.forEach(item => {
                if (item.projectId === projectId) {
                    flag = true
                }
            })
        }
    })
    return flag
}

export { saveTeamInfo }
export { getAllTeam, getTeamById }
export { updateTeamInfo, deleteTeamById }
export { getMemberByTeamId, getMemberByName, getMemberById }