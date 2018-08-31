export default function isAuth() {
    if (localStorage.getItem("isAuth")) {
        return true
    }
    return false
}