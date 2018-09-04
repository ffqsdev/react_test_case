import getActionNames from "../utils/actionNames"

import { database } from "../firebase"


const names = getActionNames("PEOPLE_FORM")

export function createPeople(name, gender, age) {
    return (dispath) => {
        dispath({
            type: names.request
        })

        try {
            database.createPeopleData(name, gender, +age)
                .then(response => {
                    dispath({
                        type: names.success,
                    })
                })
                .catch(error => {
                    dispath({
                        type: names.failure,
                        error: true,
                        payload: new Error(error.message)
                    })
                })
        } catch(error) {
            dispath({
                type: names.failure,
                error: true,
                payload: new Error(error.message)
            })
        }
    }
}

export function updatePeople(id, name, gender, age) {
    return (dispath) => {
        dispath({
            type: names.request
        })

        database.updatePeopleData(id, name, gender, +age)
            .then(response => {
                dispath({
                    type: names.success,
                })
            })
            .catch(error => {
                dispath({
                    type: names.failure,
                    error: true,
                    payload: new Error(error.message)
                })
            })
    }
}
