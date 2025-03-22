// frontend/src/components/Reports.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Reports = () => {
  const [lateFees, setLateFees] = useState([]);
  const [history, setHistory] = useState([]);
  const [overdue, setOverdue] = useState([]);

  const fetchReports = async () => {
    try {
      const [lateFeesRes, historyRes, overdueRes] = await Promise.all([
        axios.get('/api/transactions/reports/lateFees'),
        axios.get('/api/transactions/reports/history'),
        axios.get('/api/transactions/overdue')
      ]);

      if (!lateFeesRes.data.success || !historyRes.data.success || !overdueRes.data.success) {
        toast.error('Error fetching some reports.');
      }

      setLateFees(lateFeesRes.data.data || []);
      setHistory(historyRes.data.data || []);
      setOverdue(overdueRes.data.data || []);
    } catch (error) {
      toast.error('Error fetching reports.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <Card className="mb-4">
        <Card.Header>Late Fees Report</Card.Header>
        <Card.Body>
          {lateFees.length === 0 ? (
            <p>No late fees recorded.</p>
          ) : (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Book Title</th>
                  <th>Member ID</th>
                  <th>Late Fee</th>
                </tr>
              </thead>
              <tbody>
                {lateFees.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.book?.title}</td>
                    <td>{item.member}</td>
                    <td>₹{item.lateFee}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>Borrowing History</Card.Header>
        <Card.Body>
          {history.length === 0 ? (
            <p>No transactions recorded.</p>
          ) : (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Book Title</th>
                  <th>Member ID</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
                  <th>Late Fee</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.book?.title}</td>
                    <td>{item.member}</td>
                    <td>{new Date(item.issueDate).toLocaleDateString()}</td>
                    <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                    <td>
                      {item.returnDate
                        ? new Date(item.returnDate).toLocaleDateString()
                        : 'Not returned'}
                    </td>
                    <td>₹{item.lateFee}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Overdue Books</Card.Header>
        <Card.Body>
          {overdue.length === 0 ? (
            <p>No overdue transactions.</p>
          ) : (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Book Title</th>
                  <th>Member ID</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {overdue.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.book?.title}</td>
                    <td>{item.member}</td>
                    <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reports;