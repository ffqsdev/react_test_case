import React from "react"
import { Route, Redirect } from "react-router-dom"

import isAuth from "../utils/isAuth"


export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        isAuth() ? <Component {...props} /> : <Redirect to="/login" />
    )} />
)
