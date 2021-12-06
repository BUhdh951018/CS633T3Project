import { deleteProjectById, getAllProject, getProjectById, updateProjectInfo } from "../crud/projectRepository.js";
import { logInfo } from "../common/common.js";
import { setTeamList, memberInfo } from "./teamService.js";
import { taskList } from "./taskService.js";

let show_project_name = $('#show-project-name')

function projectService(success, body) {
    if (success) {
        updateProjectInfo(body, 'project')
        setTeamList()
        projectInfo(body.projectId)
        logInfo('Message: create project', body)
    }
}

function updateProjectService(success, body) {
    if (success) {
        updateProjectInfo(body, 'project')
        setTeamList()
        setCurrentProject()
        logInfo('Message: update project', body)
    }
}

function deleteProjectService(success, body) {
    if (success) {
        deleteProjectById(body.id)
        setTeamList()
        logInfo('Message: delete project', getAllProject())
    }
}

function projectInfo(projectId) {
    let cur_project = getProjectById(projectId)
    let task = cur_project.tasks
    show_project_name.empty().append("Project: ").append(cur_project.name
        + "<img id='btnUpdateProject' class='team-icon' src='/static/images/pencil-fill.svg' alt=''>")
    show_project_name.attr('projectid', projectId)
    $('#show-project-des').empty().append("Description: ").append(cur_project.description)
    memberInfo(cur_project.teamId)
    taskList(task)
}

function setCurrentProject() {
    let projectId = show_project_name.attr('projectid')
    let teamId = getProjectById(projectId).teamId
    memberInfo(teamId)
    projectInfo(projectId)
}

export { projectService, updateProjectService, deleteProjectService, setCurrentProject }
export { projectInfo }