import { deleteProjectById, getAllProject, updateProjectInfo } from "../crud/projectRepository.js";
import { logInfo } from "../common/common.js";

function projectService(success, body) {
    if (success) {
        updateProjectInfo(body, 'project')
        logInfo('Message: create project', body)
    }
}

function updateProjectService(success, body) {
    if (success) {
        updateProjectInfo(body, 'project')
        logInfo('Message: update project', body)
    }
}

function deleteProjectService(success, body) {
    if (success) {
        deleteProjectById(body)
        logInfo('Message: delete project', getAllProject())
    }
}

export { projectService, updateProjectService, deleteProjectService }