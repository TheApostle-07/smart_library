import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { setUserData } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5005/api/users/login', {
        email,
        password,
      });

      if (response.data.success) {
        const user = response.data.data;
        toast.success(`Welcome back, ${user.name}!`);

        // Save user in localStorage
        setUserData(user);

        // Update app-level state
        setUser(user);

        // Navigate based on role
        if (user.role === 'Librarian') {
          navigate('/librarian');
        } else {
          navigate('/member');
        }
      } else {
        toast.error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network or server error. Please try again.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Header className="text-center fw-bold">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <small>
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
