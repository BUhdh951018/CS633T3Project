import { loginService } from "../service/loginService.js";
import { userInfoService } from "../service/userService.js";
import { updateTeamService, teamService, deleteTeamService } from "../service/teamService.js";
import { deleteProjectService, projectService, updateProjectService } from "../service/projectService.js";
import { deleteTaskService, taskService, updateTaskService } from "../service/taskService.js";

class responseHandler {
    constructor(cmd, success, message, body) {
        this._cmd = cmd;
        this._success = success
        this._message = message
        this._body = body
    }


    get cmd() {
        return this._cmd;
    }

    get success() {
        return this._success;
    }

    get message() {
        return this._message;
    }

    get body() {
        return this._body;
    }

    login(success, body) {
        loginService(success)
    }

    getUserInfo(success, body) {
        userInfoService(success, body)
    }

    updateUserInfo(success, body) {
        userInfoService(success, body)
    }

    createTeam(success, body) {
        updateTeamService(success, body, 'createTeam')
    }

    getTeamInfo(success, body) {
        teamService(success, body)
    }

    deleteTeam(success, body) {
        deleteTeamService(success, body)
    }

    addMember(success, body) {
        updateTeamService(success, body, 'addMember')
    }

    deleteMember(success, body) {
        updateTeamService(success, body, 'deleteMember')
    }

    createProject(success, body) {
        projectService(success, body)
    }

    getProjectInfo(success, body) {

    }

    updateProject(success, body) {
        updateProjectService(success, body)
    }

    deleteProject(success, body) {
        deleteProjectService(success, body)
    }

    createTask(success, body) {
        taskService(success, body)
    }

    updateTask(success, body) {
        updateTaskService(success, body)
    }

    deleteTask(success, body) {
        deleteTaskService(success, body)
    }
}

export { responseHandler }