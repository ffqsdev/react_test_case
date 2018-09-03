import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { INDEX_PAGE } from "../constants/routes"

import { Nav, NavItem } from "reactstrap"


class MainMenu extends Component {

    render() {
        return(
            <Nav className="main__menu">
                <NavItem><Link className="nav-link" to={INDEX_PAGE}>Home</Link></NavItem>
            </Nav>
        )
    }

}

export default MainMenu
