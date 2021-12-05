import React, { useContext } from "react";
import { Nav, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../context/auth";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const NavBar = user ? (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Temp logo"
            src="/templogo.svg"
            width="70"
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/messages">Messages</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/" onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Temp logo"
            src="/templogo.svg"
            width="70"
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  return NavBar;
}
