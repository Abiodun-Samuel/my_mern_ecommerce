import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">MyShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart" className="d-flex align-items-center">
                <AiOutlineShoppingCart className="mx-1" /> Cart
              </Nav.Link>
              <Nav.Link href="/login" className="d-flex align-items-center">
                <AiOutlineLogin className="mx-1" /> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
