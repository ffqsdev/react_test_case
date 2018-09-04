import getActionNames from "../utils/actionNames"

import { auth, firebase } from "../firebase"


const names = getActionNames("USER")

export const getUserData = dispath => {

    return (dispath) => {
        dispath({
            type: names.request
        })

        try {
            firebase.auth.onAuthStateChanged(authUser => {
                let data = authUser ? authUser : null
                dispath({
                    type: names.success,
                    payload: data
                })
            });
        } catch(error) {
            dispath({
                type: names.failure,
                error: true,
                payload: new Error(error.message)
            })
        }
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        auth.signOutUser()
        localStorage.clear()
        dispatch({
            type: names.success,
            payload: {}
        })
    }
}
