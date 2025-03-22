// frontend/src/components/BorrowForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BorrowForm = ({ onTransaction }) => {
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleBorrow = async (e) => {
    e.preventDefault();
    if (!bookId || !memberId || !issueDate || !dueDate) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('`http://localhost:5005/api/transactions/borrow', {
        bookId,
        memberId,
        issueDate,
        dueDate
      });
      if (response.data.success) {
        toast.success('Book borrowed successfully!');
        setBookId('');
        setMemberId('');
        setIssueDate('');
        setDueDate('');
        onTransaction();
      } else {
        toast.error(response.data.message || 'Failed to borrow book.');
      }
    } catch (error) {
      toast.error('Error borrowing book.');
      console.error(error);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>Borrow a Book</Card.Header>
      <Card.Body>
        <Form onSubmit={handleBorrow}>
          <Form.Group className="mb-3" controlId="formBookId">
            <Form.Label>Book ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMemberId">
            <Form.Label>Member ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Member ID"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formIssueDate">
            <Form.Label>Issue Date</Form.Label>
            <Form.Control
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Borrow Book
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BorrowForm;