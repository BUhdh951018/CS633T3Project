import { getTeamInfo } from "../action/teamAction.js";
import { deleteTeamById, getAllTeam, saveTeamInfo, updateTeamInfo } from "../crud/teamRepository.js";
import { logInfo } from "../common/common.js";
import { getProjectByTeamId } from "../crud/projectRepository.js";

let team_list = $("#team-list")
let projects

function teamService(success, body) {
    if (success) {
        if (body.length !== 0) {
            saveTeamInfo(body)
            setTeamList()
        }
    }
}

function updateTeamService(success, body, title) {
    if (success) {
        if (title === 'createTeam') {
            updateTeamInfo(body, 'team')
            setTeamList()
            logInfo('Message: create team success', body)
        } else {
            // todo member
        }
    }
}

function deleteTeamService(success, body) {
    if (success) {
        deleteTeamById(body)
        logInfo('Message: delete team success', getAllTeam())
    }
}

function setTeamList() {
    team_list.empty()
    setTeamInfo(getAllTeam())
}

function setTeamInfo(team) {
    for (let i = 0; i < team.length; i++) {
        teamInfo(team[i], team_list, i)
        let teamId = team[i].teamId
        projects = getProjectByTeamId(teamId)
        for (let j = 0; j < projects.length; j++) {
            teamProject(projects[j], team_list)
        }
    }
}

function teamInfo(team, list, i) {
    list.append("<div style='float: left;font-weight: bold;color: gray' teamId='" + team.teamId + "'>"
        + "<div style='display: inline'>" + (i + 1) + ". " + team.name + "</div>"
        + "<img id='showCreateProject' class='team-icon' src='/static/images/folder-plus.svg' alt=''>"
        + "<img id='btnDeleteTeam' class='team-icon' src='/static/images/dash-circle-dotted.svg' alt=''>"
        + "</div><br>")
}

function teamProject(project, list) {
    list.append("<li style='margin-left: 20px;color: gray' projectId='" + project.projectId + "'><div style='display: inline'>"
        + project.name + "</div>"
        + "<img id='btnDeleteProject' class='team-icon' src='/static/images/folder-minus.svg' alt=''>"
        + "</li>");
}

export { updateTeamService, teamService, deleteTeamService, setTeamList }