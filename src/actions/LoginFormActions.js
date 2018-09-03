import getActionNames from "../utils/actionNames"


const names = getActionNames("LOGIN")

export function authUser(username, password) {
    return (dispath) => {
        const valid_username = "admin",
              valid_password = "12345"

        dispath({
            type: names.request
        })

        setTimeout(() => {
            if (username === valid_username &&
                password === valid_password) {

                dispath({
                    type: names.success
                })

                localStorage.setItem("isAuth", true)
            } else {
                dispath({
                    type: names.failure,
                    error: true,
                    payload: new Error("invalid username or password")
                })
            }
        }, 2000)
    }
}
