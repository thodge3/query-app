import React from 'react';
// import styles from "./Navbar.module.css";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom'
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

const NavbarComponent = () => {
    return (
        <Navbar bg="light" expand="md">
            <Navbar.Brand href="/home">CampFast</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink> */}
                    <NavLink to="/second" className="nav-link" activeClassName="active">Camps</NavLink>
                    {/* <Nav.Link href="#link">Create Camp</Nav.Link>
                    <Nav.Link href="#link">Map</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarComponent;