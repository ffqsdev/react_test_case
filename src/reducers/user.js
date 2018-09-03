import { baseReducer } from "./base"


const initialState = {
    data: {
        nickname: "Anonymous"
    },
    isFetching: false,
    error: ""
}

export const userReducer = baseReducer("USER", initialState)
