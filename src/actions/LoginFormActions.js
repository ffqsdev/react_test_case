import getActionNames from "../utils/actionNames"

import { auth } from "../firebase"


const names = getActionNames("LOGIN")
const user_names = getActionNames("USER")

export function authUser(username, password) {
    return (dispath) => {
        dispath({
            type: names.request
        })

        auth.authUser(username, password)
            .then(response => {
                dispath({
                    type: names.success
                })

                console.log(response)

                localStorage.setItem("isAuth", true)

                let user = response.user
                dispath({
                    type: user_names.success,
                    payload: {id: user.uid, nickname: user.email}
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
