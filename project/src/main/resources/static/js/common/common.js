function logInfo(title, message) {
    console.group(title)
    console.log(message)
    console.groupEnd()
}

function getUsername() {
    return sessionStorage.getItem('username')
}
export { logInfo, getUsername }