import { baseReducer } from "./base"


const initialState = {
    data: {
        uid: null,
        email: ""
    },
    isFetching: false,
    error: ""
}

export const userReducer = baseReducer("USER", initialState)
