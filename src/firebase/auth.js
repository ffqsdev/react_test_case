import { auth } from "./firebase"


export const createUser = (username, password) => {
    return auth.createUserWithEmailAndPassword(username, password)
}

export const authUser = (username, password) => {
    return auth.signInWithEmailAndPassword(username, password)
}

export const signOutUser = () => {
    return auth.signOut()
}
