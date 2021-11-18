import { updateUserInfo } from "../action/userAction.js";

$(document).ready(function () {
    $("#btnUpdateUserInfo").click(() => {
        updateUserInfo()
    })
})