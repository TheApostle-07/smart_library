import React, { useState } from 'react';
import { Container, Tab, Nav } from 'react-bootstrap';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import BorrowForm from '../components/BorrowForm';
import ReturnForm from '../components/ReturnForm';
import Reports from '../components/Reports';

const LibrarianDashboard = () => {
  const [key, setKey] = useState('addBook');

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">📚 Librarian Dashboard</h2>

      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        {/* Horizontal Tab Navigation */}
        <Nav variant="tabs" className="justify-content-center mb-4">
          <Nav.Item>
            <Nav.Link eventKey="addBook">Add Book</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="viewBooks">View Books</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="borrowBook">Borrow Book</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="returnBook">Return Book</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reports">Reports</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab Content Area */}
        <Tab.Content>
          <Tab.Pane eventKey="addBook">
            <BookForm />
          </Tab.Pane>
          <Tab.Pane eventKey="viewBooks">
            <BookList isAdminView={true} />
          </Tab.Pane>
          <Tab.Pane eventKey="borrowBook">
            <BorrowForm />
          </Tab.Pane>
          <Tab.Pane eventKey="returnBook">
            <ReturnForm />
          </Tab.Pane>
          <Tab.Pane eventKey="reports">
            <Reports />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default LibrarianDashboard;
