import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/requirements">Requirements</Nav.Link>
                    <Nav.Link href="/foods">Food Items</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
