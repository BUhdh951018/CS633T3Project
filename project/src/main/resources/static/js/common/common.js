function logInfo(title, message) {
    console.group(title)
    console.log(message)
    console.groupEnd()
}

export { logInfo }