import { getTeamInfo } from "../action/teamAction.js";
import { deleteTeamById, getAllTeam, saveTeamInfo, updateTeamInfo } from "../crud/teamRepository.js";
import { logInfo } from "../common/common.js";
import { getAllProject, getProjectByTeamId } from "../crud/projectRepository.js";
import { getAllTask } from "../crud/taskRepository.js";
import { setCurrentProject } from "./projectService.js";
import { getMemberByTeamId } from "../crud/teamRepository.js";
import { getUser } from "../crud/userRepository.js";

let team_list = $("#team-list")
let member_list = $('#member-list')
let projects, user

function teamService(success, body) {
    if (success) {
        if (body.length !== 0) {
            saveTeamInfo(body)
            setTeamList()
            logInfo('Message: team-info', getAllTeam())
            logInfo('Message: project-info', getAllProject())
            logInfo('Message: task-info', getAllTask())
        }
    }
}

function updateTeamService(success, body, title) {
    if (success) {
        if (title === 'createTeam') {
            updateTeamInfo(body, 'team')
            setTeamList()
            //memberInfo(body.teamId)
            logInfo('Message: create team success', body)
        } else {
            updateTeamInfo(body, 'team')
            setCurrentProject()
            logInfo('Message update member', body)
        }
    }
}

function deleteTeamService(success, body) {
    if (success) {
        deleteTeamById(body.id)
        setTeamList()
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

function memberInfo(id) {
    let temp_member = getMemberByTeamId(id);
    member_list.empty();
    member_list.attr('teamid', id);
    temp_member.forEach(element => {
        member_list.append(getMemberInfoIcon(element))
    })

}

function getMemberInfoIcon(user) {
    return "<div class='member-profile'>"
        + "<img class='member-icon-big' src='/static/images/person-circle.svg' alt=''>"
        + user.username
        + "<img id='btnDeleteMember' userid='" + user.id + "' "
        + "src='/static/images/dash-circle-fill.svg' class='member-icon-sm' alt=''>"
        + "</div>"
}

export { updateTeamService, teamService, deleteTeamService, setTeamList }
export { memberInfo }