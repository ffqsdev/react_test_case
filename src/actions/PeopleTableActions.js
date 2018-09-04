import getActionNames from "../utils/actionNames"

import { database } from "../firebase"


const names = getActionNames("PEOPLE_TABLE")

export const getPeopleTableData = (page, perPage) => {

    return (dispath) => {
        dispath({
            type: names.request
        })

        database.getPeopleData(page, perPage).on("value", function(response) {
            let object_data = response.val(),
                    array_data = []

            for (let key in object_data) {
                array_data.push(object_data[key])
                array_data[array_data.length - 1 ].id = key
            }

            dispath({
                type: names.success,
                payload: array_data.reverse()
            })
        },
        function(error) {
            dispath({
                type: names.failure,
                error: true,
                payload: new Error(error.message)
            })
        })
    }
}

export const deletePeople = (id) => {

    return (dispath) => {
        dispath({
            type: names.request
        })

        database.deletePeopleData(id)
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
