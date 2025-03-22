import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Row, Col, Button, Spinner, Badge } from 'react-bootstrap';

const BookList = ({ showBranchFilter = true }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const fetchBranches = async () => {
    try {
      const res = await axios.get('http://localhost:5005/api/books/branches');
      if (res.data.success) {
        setBranches(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const query = selectedBranch
        ? `branch=${encodeURIComponent(selectedBranch)}&page=${page}&limit=${limit}`
        : `page=${page}&limit=${limit}`;

      const res = await axios.get(`http://localhost:5005/api/books?${query}`);
      if (res.data.success) {
        setBooks(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalBooks(res.data.totalBooks);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showBranchFilter) {
      fetchBranches();
    }
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, [selectedBranch, page]);

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
    setPage(1);
  };

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      {showBranchFilter && (
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <Form.Group controlId="branchSelect">
              <Form.Label>📂 Filter by Branch</Form.Label>
              <Form.Select
                value={selectedBranch}
                onChange={handleBranchChange}
                className="shadow-sm"
              >
                <option value="">📚 All Branches</option>
                {branches.map((branch, idx) => (
                  <option key={idx} value={branch}>
                    {branch}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} className="text-end mt-4 mt-md-0">
            {totalBooks > 0 && (
              <div>
                <span className="me-2">
                  <Badge bg="info">Total Books: {totalBooks}</Badge>
                </span>
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={handlePrev}
                  disabled={page === 1}
                >
                  ⬅ Prev
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={handleNext}
                  disabled={page === totalPages}
                >
                  Next ➡
                </Button>
              </div>
            )}
          </Col>
        </Row>
      )}

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center text-muted py-4">
          <span role="img" aria-label="no-books" style={{ fontSize: '1.5rem' }}>📭</span>
          <p className="mt-2 mb-0">No books available.</p>
        </div>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark text-center">
            <tr>
              <th>📖 Title</th>
              <th>✍ Author</th>
              <th>🏛 Branch</th>
              <th>📦 Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author || '-'}</td>
                <td>{book.branch}</td>
                <td>
                  <Badge bg={book.status === 'Available' ? 'success' : 'danger'}>
                    {book.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {totalPages > 1 && (
        <div className="text-center mt-3 text-muted">
          Page {page} of {totalPages}
        </div>
      )}
    </>
  );
};

export default BookList;
