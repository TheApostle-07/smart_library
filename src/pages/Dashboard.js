// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import BorrowForm from '../components/BorrowForm';
import ReturnForm from '../components/ReturnForm';
import Reports from '../components/Reports';

const Dashboard = () => {
  const [branch, setBranch] = useState('Central Library');
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/books/${branch}`);
      if (response.data.success) {
        setBooks(response.data.data);
      } else {
        toast.error(response.data.message || 'Error fetching books');
      }
    } catch (error) {
      toast.error('Error fetching books');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [branch]);

  return (
    <Container className="my-4">
      <h1 className="mb-4">Smart Library Management System</h1>
      <Form.Group controlId="branchSelect" className="mb-4">
        <Form.Label>Select Branch:</Form.Label>
        <Form.Select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="Central Library">Central Library</option>
          <option value="North Library">North Library</option>
          <option value="East Library">East Library</option>
        </Form.Select>
      </Form.Group>
      <Row id="books" className="mb-5">
        <Col md={12}>
          <BookList books={books} />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={6}>
          <BookForm branch={branch} onBookAdded={fetchBooks} />
        </Col>
        <Col md={6}>
          <BorrowForm onTransaction={fetchBooks} />
        </Col>
      </Row>
      <Row id="transactions" className="mb-5">
        <Col md={12}>
          <ReturnForm onTransaction={fetchBooks} />
        </Col>
      </Row>
      <Row id="reports">
        <Col md={12}>
          <Reports />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;