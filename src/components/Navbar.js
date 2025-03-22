// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { clearUserData } from '../utils/auth';

const MainNavbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserData();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Smart Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && user.role === 'Librarian' && (
              <>
                <Nav.Link as={Link} to="/admin">
                  Admin Dashboard
                </Nav.Link>
              </>
            )}
            {user && user.role === 'Member' && (
              <>
                <Nav.Link as={Link} to="/member">
                  Member Dashboard
                </Nav.Link>
              </>
            )}
            {user && (
              <Nav.Link onClick={handleLogout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;