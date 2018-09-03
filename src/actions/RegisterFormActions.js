import getActionNames from "../utils/actionNames"

import { auth } from "../firebase"


const names = getActionNames("REGISTER")

export function registerUser(username, password, confirm_password) {
    return (dispath) => {
        dispath({
            type: names.request
        })

        if (password !== confirm_password) {
            return dispath({
                type: names.failure,
                error: true,
                payload: new Error("passwords is not equals")
            })
        }

        auth.createUser(username, password)
            .then(authUser => {
                console.log(authUser)
                dispath({
                    type: names.success,
                    payload: authUser
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
