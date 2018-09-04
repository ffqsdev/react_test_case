import { baseReducer } from "./base"


const initialState = {
    isFetching: false,
    error: ""
}

export const peopleFormReducer = baseReducer("PEOPLE_FORM", initialState)
