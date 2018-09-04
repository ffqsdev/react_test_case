import { database } from "./firebase"

import getCurrentUserId from "../utils/isAuth"


export const createPeopleData = (name, gender, age) => {
    const userId = getCurrentUserId()

    return database.ref(`/people/${userId}`).push({
        name: name,
        gender: gender,
        age: age
    })
}

export const updatePeopleData = (id, name, gender, age) => {
    const userId = getCurrentUserId()

    return database.ref(`/people/${userId}/${id}`).update({
        name: name,
        gender: gender,
        age: age
    })
}

export const deletePeopleData = (id) => {
    const userId = getCurrentUserId()

    return database.ref(`/people/${userId}/${id}`).remove()
}

export const getPeopleData = (page, perPage) => {
    const userId = getCurrentUserId()

    let limit = page*perPage+perPage+1
    return database.ref(`/people/${userId}`).limitToLast(limit)
}
