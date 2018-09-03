import getActionNames from "../../utils/actionNames"

export const baseGetAction = (actionName, url) => dispath => {
    const names = getActionNames(actionName)

    return (dispath) => {
        dispath({
            type: names.request
        })

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response.json()
            })
            .then(data => {
                dispath({
                    type: names.success,
                    payload: data
                })
            })
            .catch(error => {
                dispath({
                    type: names.failure,
                    error: true,
                    payload: new Error(error.message)
                })
            })
    }
}
