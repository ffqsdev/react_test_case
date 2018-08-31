import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"

import MainMenu from "../MainMenu"
import LoginForm from "../../containers/LoginForm"
import PeopleTable from "../../containers/PeopleTable"
import { PrivateRoute } from "../../components/PrivateRoute"

import { Container } from "reactstrap"

import "./App.css";

class App extends Component {

    render() {
        return (
            <Container>
                <MainMenu/>
                <Switch>
                    <PrivateRoute exact path="/" component={PeopleTable} />
                    <Route path="/login" component={LoginForm} />
                </Switch>
            </Container>
        );
    }

}

export default App;
