import getActionNames from "../utils/actionNames"

import { baseGetAction } from "./base"
import { auth } from "../firebase"


const names = getActionNames("USER")

export const getUserData = baseGetAction("USER", "/data/user.json")

export const logoutUser = () => {
    return (dispatch) => {
        auth.signOutUser()
        localStorage.clear("isAuth")
        dispatch({
            type: names.success,
            payload: {}
        })
    }
}
