// frontend/src/components/BookForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BookForm = ({ branch, onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Book title is required.');
      return;
    }

    if (!branch) {
      toast.error('Branch information is missing.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5005/api/books/${branch}`, {
        title,
        author,
        isbn
      });

      if (response.data.success) {
        toast.success('Book added successfully!');
        setTitle('');
        setAuthor('');
        setIsbn('');
        onBookAdded(); // Trigger book list refresh
      } else {
        toast.error(response.data.message || 'Failed to add book.');
      }
    } catch (error) {
      toast.error('Error adding book.');
      console.error('BookForm Error:', error);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>Add a New Book</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBookTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBookAuthor" className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBookISBN" className="mb-3">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ISBN (optional)"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Book to {branch}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BookForm;