import { baseReducer } from "./base"


const initialState = {
    isFetching: false,
    error: ""
}

export const loginFormReducer = baseReducer("LOGIN", initialState)
