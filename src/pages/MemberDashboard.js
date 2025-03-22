// frontend/src/pages/MemberDashboard.js
import React, { useState } from 'react';
import { Container, Tab, Nav } from 'react-bootstrap';
import BookList from '../components/BookList';
import BorrowForm from '../components/BorrowForm';
import ReturnForm from '../components/ReturnForm';

const MemberDashboard = () => {
  const [key, setKey] = useState('viewBooks');

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">📖 Member Dashboard</h2>

      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        {/* Horizontal Tabs */}
        <Nav variant="tabs" className="justify-content-center mb-4">
          <Nav.Item>
            <Nav.Link eventKey="viewBooks">View Books</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="borrowBook">Borrow Book</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="returnBook">Return Book</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab Content */}
        <Tab.Content>
          <Tab.Pane eventKey="viewBooks">
            <BookList isAdminView={false} />
          </Tab.Pane>
          <Tab.Pane eventKey="borrowBook">
            <BorrowForm />
          </Tab.Pane>
          <Tab.Pane eventKey="returnBook">
            <ReturnForm />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default MemberDashboard;