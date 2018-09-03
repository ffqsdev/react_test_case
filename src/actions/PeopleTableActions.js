import getActionNames from "../utils/actionNames"

import { database } from "../firebase"


const names = getActionNames("PEOPLE_TABLE")

export const getPeopleTableData = (actionName, url) => {

    return (dispath) => {
        dispath({
            type: names.request
        })

        database.getPeopleData().once("value")
            .then(response => {
                dispath({
                    type: names.success,
                    payload: response.val()
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

