import { deleteTaskById, getAllTask, updateTaskInfo } from "../crud/taskRepository.js";
import { logInfo } from "../common/common.js";

function taskService(success, body) {
    if (success) {
        updateTaskInfo(body)
        logInfo('Message: create task', body)
    }
}

function updateTaskService(success, body) {
    if (success) {
        updateTaskInfo(body)
        logInfo('Message: update task', body)
    }
}

function deleteTaskService(success, body) {
    if (success) {
        deleteTaskById(body)
        logInfo('Message: delete task', getAllTask())
    }
}

export { taskService, updateTaskService, deleteTaskService }