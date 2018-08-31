import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Nav, NavItem } from "reactstrap"


class MainMenu extends Component {

    render() {
        return(
            <Nav className="main__menu">
                <NavItem><Link className="nav-link" to="/">Home</Link></NavItem>
            </Nav>
        )
    }

}

export default MainMenu
