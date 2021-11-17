function addElement(id, old) {
    let oldArray = old.split(";")
    oldArray.push(id)
    return oldArray.join(";")
}

function deleteElement(id, old) {
    let oldArray = old.split(";")
    oldArray = oldArray.filter(element => element !== id)
    return oldArray.join(";")
}

export { addElement, deleteElement }