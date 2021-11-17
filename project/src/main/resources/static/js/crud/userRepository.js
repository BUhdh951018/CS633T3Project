let user = null

function saveUser(user) {
    sessionStorage.setItem("user", JSON.stringify(user))
}

function getUser() {
    user = JSON.parse(sessionStorage.getItem("user"))
    return user
}

export { saveUser, getUser }