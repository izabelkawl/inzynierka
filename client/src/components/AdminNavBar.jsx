import React, { Component } from 'react'
import { Navbar, Nav, } from 'react-bootstrap';
import { Image } from 'react-bootstrap'
import styled from 'styled-components'
import logo from './img/nap1.png'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const Logo = styled.a.attrs({
    className: 'navbar-header',
})`padding-top: 5px;
padding-bottom: 5px;`

class AdminNavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >

                    <Nav className="mr-auto">
                        <Logo className="navbar-header">
                            <Image src={logo} height="30" alt="tulipan" /></Logo>

                    </Nav>
                    <Nav>
                        <Nav.Link href="/admin" className="nav-link ">
                            Panel
                            </Nav.Link>
                        <Nav.Link href="/users/list" className="nav-link ">
                            Użytkownicy
                            </Nav.Link>

                        <Nav.Link href="/allotments/list" className="nav-link ">
                            Działki
                            </Nav.Link>
                        <Nav.Link href="/handyman/list" className="nav-link ">
                            Fochowcy
                            </Nav.Link>
                        <Nav.Link href="/messages/list" className="nav-link ">
                            Wiadomości
                            </Nav.Link>


                        <Nav.Link href="/table" className="nav-link ">
                            Tablica ogłoszeń
                            </Nav.Link>
                        <Nav.Link href="/messages/list" className="nav-link ">
                            Finanse
                            </Nav.Link>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default AdminNavBar