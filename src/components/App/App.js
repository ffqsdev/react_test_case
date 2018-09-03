import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"

import MainMenu from "../MainMenu"
import LoginForm from "../../containers/LoginForm"
import RegisterForm from "../../containers/RegisterForm"
import UserWidget from "../../containers/UserWidget"
import PeopleTable from "../../containers/PeopleTable"

import { PrivateRoute } from "../../components/PrivateRoute"

import * as routes from "../../constants/routes"

import { Container } from "reactstrap"

import "./App.css";

class App extends Component {

    render() {
        return (
            <Container>
                <UserWidget/>
                <MainMenu/>
                <Switch>
                    <PrivateRoute exact path={routes.INDEX_PAGE} component={PeopleTable} />
                    <Route path={routes.REGISTER_PAGE} component={RegisterForm} />
                    <Route path={routes.LOGIN_PAGE} component={LoginForm} />
                </Switch>
            </Container>
        );
    }

}

export default App;
