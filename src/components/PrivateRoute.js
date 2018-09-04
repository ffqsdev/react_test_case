import React from "react"
import { Route, Redirect } from "react-router-dom"

import { LOGIN_PAGE } from "../constants/routes"

import getCurrentUserId from "../utils/isAuth"


export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        getCurrentUserId() ? <Component {...props} /> : <Redirect to={LOGIN_PAGE} />
    )} />
)
