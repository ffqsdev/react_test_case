import { combineReducers } from "redux"

import { peopleTableReducer } from "./peopleTable"
import { userReducer } from "./user"
import { loginFormReducer } from "./loginForm"
import { registerFormReducer } from "./registerForm"
import { peopleFormReducer } from "./peopleForm"


export const rootReducer = combineReducers({
    peopleTable: peopleTableReducer,
    user: userReducer,
    loginForm: loginFormReducer,
    registerForm: registerFormReducer,
    peopleForm: peopleFormReducer,
})
