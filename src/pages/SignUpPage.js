import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member'); // Default role is Member

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5005/api/users/register', {
        name,
        email,
        password,
        role
      });
      if (response.data.success) {
        toast.success('Signup successful! Please login.');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Signup failed.');
      }
    } catch (error) {
      toast.error('Error signing up.');
      console.error(error);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Header>Signup</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Member">Member</option>
                <option value="Librarian">Librarian</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Signup
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignupPage;
