import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'

import { LOGIN_PAGE, REGISTER_PAGE } from "../constants/routes"

import { getUserData, logoutUser } from "../actions/UserActions"
import isAuth from "../utils/isAuth"

import { Row, Col, Media, Button } from "reactstrap"


class UserWidget extends Component {

    componentWillMount() {
        this.props.getUserData()
    }

    logOut = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    renderTemplate = () => {
        const { data, isFetching, error } = this.props.user

        if (isFetching) {
            return (<p>Loading...</p>)
        }

        if (error) {
            return (<p>Error: {error.message}</p>)
        }

        if (isAuth()) {
            return (
                <Fragment>
                    <Media data-src="" alt=""/>
                    <div className="user__widget_text-box">
                        <h3>{data.nickname}</h3>
                        <Button 
                            onClick={this.logOut}
                            color="danger">SignOut</Button>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Link className="nav-link" to={LOGIN_PAGE}>Sign In</Link>
                    <Link className="nav-link" to={REGISTER_PAGE}>Sign Up</Link>
                </Fragment>
            )
        }
    }

    render() {
        return (
            <Row>
                <Col>
                    <div className="user__widget">
                        {this.renderTemplate()}   
                    </div>
                </Col>
            </Row>
        )
    }

}

const mapStateToProps = store => {
    return {
        user: store.user
    }
}

const mapDispathToProps = dispatch => {
    return {
        getUserData: () => dispatch(getUserData()),
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispathToProps)(UserWidget)
