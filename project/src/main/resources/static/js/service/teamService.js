import { getTeamInfo } from "../action/teamAction.js";
import { saveTeamInfo } from "../crud/teamRepository";

function createTeamService(success, body) {
    if (success) {
        getTeamInfo()
    }
}

function teamService(success, body) {
    if (success) {
        if (body.length !== 0) {
            saveTeamInfo(body)
        }
    }
}

export { createTeamService, teamService }