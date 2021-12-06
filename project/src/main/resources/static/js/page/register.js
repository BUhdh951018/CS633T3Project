import { getQueryString } from "../common/common.js";

$(document).ready(function () {
    let message = getQueryString('message')
    if (message !== null) {
        alert('username has been used!')
    }
})