import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Header() {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Link to="/" className="navbar-brand">
                    Планы питания
                </Link>
                <Nav className="me-auto">
                    <Link to="/requirements" className="nav-link">
                        Потребности
                    </Link>
                    <Link to="/foods" className="nav-link">
                        Блюда
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
