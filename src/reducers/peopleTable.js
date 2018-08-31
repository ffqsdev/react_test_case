import { baseReducer } from "./base"


const initialState = {
    data: [],
    isFetching: false,
    error: ""
}

export const peopleTableReducer = baseReducer("PEOPLE_TABLE", initialState)
