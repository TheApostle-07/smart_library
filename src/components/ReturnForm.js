// frontend/src/components/ReturnForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ReturnForm = ({ onTransaction }) => {
  const [transactionId, setTransactionId] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleReturn = async (e) => {
    e.preventDefault();
    if (!transactionId || !returnDate) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('/api/transactions/return', {
        transactionId,
        returnDate
      });
      if (response.data.success) {
        toast.success('Book returned successfully!');
        setTransactionId('');
        setReturnDate('');
        onTransaction();
      } else {
        toast.error(response.data.message || 'Failed to return book.');
      }
    } catch (error) {
      toast.error('Error returning book.');
      console.error(error);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>Return a Book</Card.Header>
      <Card.Body>
        <Form onSubmit={handleReturn}>
          <Form.Group className="mb-3" controlId="formTransactionId">
            <Form.Label>Transaction ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formReturnDate">
            <Form.Label>Return Date</Form.Label>
            <Form.Control
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Return Book
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ReturnForm;