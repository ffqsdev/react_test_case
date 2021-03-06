import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { authUser } from "../actions/LoginFormActions"

import { INDEX_PAGE } from "../constants/routes"

import { Button, Form, FormGroup, Input } from "reactstrap"


class LoginForm extends Component {

    state = {
        username: "",
        password: ""
    }

    changeText = e => {
        const {name, value} = e.currentTarget
        this.setState({[name]: value})
    }

    handleSubmitForm = e => {
        e.preventDefault()

        const {username, password} = this.state

        this.props.authUser(username, password)
    }

    isDisabledForm = () => {
        if (this.props.loginForm.isFetching) {
            return true
        }
        return false
    }

    renderStatus = () => {
        const {isFetching, error} = this.props.loginForm

        if (isFetching) {
            return (
                <p>Processing...</p>
            )
        }
        if (error) {
            return (
                <p>Error: {error.message}</p>
            )
        }
    }

    render() {
        const {username, password} = this.state

        return(
            <div className="login__form">
                {this.renderStatus()}
                {this.props.user.data.uid && <Redirect to={INDEX_PAGE} />}
                <Form>
                    <FormGroup>
                        <Input
                            onChange={this.changeText}
                            name="username"
                            type="text"
                            placeholder="username"
                            value={username} />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            onChange={this.changeText}
                            name="password"
                            type="password"
                            placeholder="password"
                            value={password} />
                    </FormGroup>
                    <Button
                        type="submit"
                        onClick={this.handleSubmitForm}
                        disabled={this.isDisabledForm()}
                        color="primary">SignIn</Button>
                </Form>
            </div>
        )
    }

}

const mapStateToProps = store => {
    return {
        user: store.user,
        loginForm: store.loginForm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authUser: (username, password) => dispatch(authUser(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
