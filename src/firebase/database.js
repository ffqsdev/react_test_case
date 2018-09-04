import { database } from "./firebase"


export const createPeopleData = (name, gender, age) => {
    return database.ref("/people/").push({
        name: name,
        gender: gender,
        age: age
    })
}

export const getPeopleData = () => {
    return database.ref("/people")
}
