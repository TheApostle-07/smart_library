import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-5">
      <Container className="text-center">
        <small>&copy; {new Date().getFullYear()} Smart Library Management System</small>
      </Container>
    </footer>
  );
};

export default Footer;
