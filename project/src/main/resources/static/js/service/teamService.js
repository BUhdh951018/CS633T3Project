import { getTeamInfo } from "../action/teamAction.js";
import { deleteTeamById, getAllTeam, saveTeamInfo, updateTeamInfo } from "../crud/teamRepository.js";
import { logInfo } from "../common/common.js";

function teamService(success, body) {
    if (success) {
        if (body.length !== 0) {
            saveTeamInfo(body)
        }
    }
}

function updateTeamService(success, body, title) {
    if (success) {
        if (title === 'createTeam') {
            updateTeamInfo(body, 'team')
            logInfo('Message: create team success', body)
        } else {

        }
    }
}

function deleteTeamService(success, body) {
    if (success) {
        deleteTeamById(body)
        logInfo('Message: delete team success', getAllTeam())
    }
}

export { updateTeamService, teamService, deleteTeamService }