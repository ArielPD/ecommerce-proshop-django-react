import React from 'react'
import {Navbar, Container, Nav, NavDropdown  } from 'react-bootstrap';

export default function Header() {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">ProShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/caart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                    <Nav.Link href="/login"><i className='fas fa-user'></i>Login</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
