import React, { Component } from "react"
import { connect } from "react-redux"

import { Button, Form, FormGroup, Input } from "reactstrap"


class PeopleForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.id ? props.id : null,
            name: props.name ? props.name : "",
            gender: props.gender ? props.gender : "male",
            age: props.age ? props.age : ""
        }
    }

    changeText = e => {
        const {name, value} = e.currentTarget
        this.setState({[name]: value})
    }

    handleSubmitForm = e => {
        e.preventDefault()
        this.props.submitHandler(this.state)
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
        const { name, gender, age } = this.state

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
                        type="submit"
                        onClick={this.handleSubmitForm}
                        disabled={this.isDisabledForm()}
                        color="success">{this.props.buttonText}</Button>
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

export default connect(mapStateToProps)(PeopleForm)
