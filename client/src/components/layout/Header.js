import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to="/" className="navbar-brand">
                    Diet Plans
                </Link>
                <Nav className="me-auto">
                    <Link to="/requirements" className="nav-link">
                        Requirements
                    </Link>
                    <Link to="/foods" className="nav-link">
                        Food Items
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
