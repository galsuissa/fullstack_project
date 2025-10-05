import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/* Navbar Component 
 * This component represents the navigation bar at the top of the application.
 * It includes the brand logo, a home link, and a button to show the shopping cart with the total items and price.
 */
function NavbarComponent({ handleShow, cart }) {
  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-5 d-flex align-items-center">{/* Logo and brand name linked to the home page */}
          <img
            src="/images/logo.png" alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          לְך לָך
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="fs-6 text-white">בית</Nav.Link> {/* Home link */}
          </Nav>
          <Button variant="outline-light" onClick={handleShow} className="ms-3 fs-6">{/* Button to show cart modal, displaying total items and total price */}
            <FaShoppingCart /> {totalItems} פריטים (₪{totalPrice}) {/* Shopping cart icon */}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
