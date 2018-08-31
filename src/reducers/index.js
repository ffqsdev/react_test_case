import { combineReducers } from "redux"

import { peopleTableReducer } from "./peopleTable"
import { userReducer } from "./user"
import { loginFormReducer } from "./loginForm"


export const rootReducer = combineReducers({
    peopleTable: peopleTableReducer,
    user: userReducer,
    loginForm: loginFormReducer,
})
