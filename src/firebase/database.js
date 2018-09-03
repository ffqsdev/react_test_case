import { database } from "./firebase"


export const getPeopleData = () => {
    return database.ref("/people")
}
