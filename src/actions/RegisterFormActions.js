import getActionNames from "../utils/actionNames"

import { auth } from "../firebase"


const names = getActionNames("REGISTER")
const user_names = getActionNames("USER")

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
            .then(response => {
                dispath({
                    type: names.success
                })
                
                let user = response.user

                localStorage.setItem("user_uid", user.uid)

                dispath({
                    type: user_names.success,
                    payload: user
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
