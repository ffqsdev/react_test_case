import { baseReducer } from "./base"


const initialState = {
    data: [],
    isFetching: false,
    error: ""
}

export const userReducer = baseReducer("USER", initialState)
