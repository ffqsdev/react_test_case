import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const config = {
    apiKey: "AIzaSyB5KW-Fga_nknJftEcg_U6emdRGcgzlVKs",
    authDomain: "react-test-case.firebaseapp.com",
    databaseURL: "https://react-test-case.firebaseio.com",
    projectId: "react-test-case",
    storageBucket: "react-test-case.appspot.com",
    messagingSenderId: "225190879762"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const auth = firebase.auth()
const database = firebase.database()

export {
    auth,
    database
}
