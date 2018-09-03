import { baseReducer } from "./base"


const initialState = {
    isFetching: false,
    error: ""
}

export const registerFormReducer = baseReducer("REGISTER", initialState)
