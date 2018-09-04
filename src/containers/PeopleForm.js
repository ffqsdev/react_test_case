import React, { Component } from "react"
import { connect } from "react-redux"

import { createPeople } from "../actions/PeopleFormActions"

import { Button, Form, FormGroup, Input } from "reactstrap"


class PeopleForm extends Component {

    state = {
        name: "",
        gender: "",
        age: ""
    }

    changeText = e => {
        const {name, value} = e.currentTarget
        this.setState({[name]: value})
    }

    handleSubmitForm = e => {
        e.preventDefault()

        const {name, gender, age} = this.state

        this.props.createPeople(name, gender, age)
    }

    isDisabledForm = () => {
        if (this.props.peopleForm.isFetching) {
            return true
        }
        return false
    }

    renderStatus = () => {
        const {isFetching, error} = this.props.peopleForm

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
        const {name, gender, age} = this.state

        return(
            <div className="people__form">
                {this.renderStatus()}
                <Form>
                    <FormGroup>
                        <Input
                            onChange={this.changeText}
                            name="name"
                            type="text"
                            placeholder="name"
                            value={name} />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            onChange={this.changeText}
                            name="gender"
                            type="select"
                            value={gender}>
                            <option>male</option>
                            <option>female</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            onChange={this.changeText}
                            name="age"
                            type="text"
                            placeholder="age"
                            value={age} />
                    </FormGroup>
                    <Button 
                        onClick={this.handleSubmitForm}
                        disabled={this.isDisabledForm()}
                        color="success">Create</Button>
                </Form>
            </div>
        )
    }

}

const mapStateToProps = store => {
    return {
        peopleForm: store.peopleForm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createPeople: (name, gender, age) =>
            dispatch(createPeople(name, gender, age)),
        // updatePeople: (name, gender, age) =>
        //     dispatch(updatePeople(name, gender, age))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleForm)
