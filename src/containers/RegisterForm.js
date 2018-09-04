import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { registerUser } from "../actions/RegisterFormActions"

import { INDEX_PAGE } from "../constants/routes"

import { Button, Form, FormGroup, Input } from "reactstrap"


class RegisterForm extends Component {
    state = {
        username: "",
        password: "",
        confirm_password: ""
    }

    changeText = e => {
        const {name, value} = e.currentTarget
        this.setState({[name]: value})
    }

    handleSubmitForm = e => {
        e.preventDefault()

        const {username, password, confirm_password} = this.state

        this.props.registerUser(username, password, confirm_password)
    }

    isDisabledForm = () => {
        if (this.props.registerForm.isFetching) {
            return true
        }
        return false
    }

    renderStatus = () => {
        const {isFetching, error} = this.props.registerForm

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
        const {username, password, confirm_password} = this.props

        return (
            <div className="register__form">
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
                    <FormGroup>
                        <Input
                            onChange={this.changeText}
                            name="confirm_password"
                            type="password"
                            placeholder="confirm_password"
                            value={confirm_password} />
                    </FormGroup>
                    <Button
                        type="submit"
                        onClick={this.handleSubmitForm}
                        disabled={this.isDisabledForm()}
                        color="primary">SignUp</Button>
                </Form>
            </div>
        )
    }

}

const mapStateToProps = store => {
    return {
        registerForm: store.registerForm,
        user: store.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (username, password, confirm_password) => 
            dispatch(registerUser(username, password, confirm_password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
