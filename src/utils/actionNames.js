import {
    ASYNC_REQUEST,
    ASYNC_SUCCESS,
    ASYNC_FAILURE
} from "../constants/actions"


export default function getActionNames(name) {
    return {
        request: ASYNC_REQUEST+"_"+name,
        success: ASYNC_SUCCESS+"_"+name,
        failure: ASYNC_FAILURE+"_"+name
    }
}
