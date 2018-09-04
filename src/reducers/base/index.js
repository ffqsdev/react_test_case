import getActionNames from "../../utils/actionNames"


export const baseReducer = (reducerName, initialState, action) =>  {
    const names = getActionNames(reducerName)

    return (state=initialState, action) => {
        switch(action.type) {
            case names.request:
                return {...state, isFetching: true, error: ""}
            case names.success:
                return {...state, isFetching: false, data: action.payload ? action.payload : state.data}
            case names.failure:
                return {...state, isFetching: false, error: action.payload}
            default:
                return state
        }
    }
}
