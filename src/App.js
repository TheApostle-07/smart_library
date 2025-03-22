import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainNavbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import LibrarianDashboard from './pages/LibrarianDashboard';
import MemberDashboard from './pages/MemberDashboard';
import { getUserData } from './utils/auth';

function App() {
  const [user, setUser] = useState(getUserData());
  const location = useLocation();

  useEffect(() => {
    const storedUser = getUserData();
    setUser(storedUser);
  }, [location]);

  return (
    <>
      <MainNavbar user={user} />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        <Route
          path="/librarian"
          element={user?.role === 'Librarian' ? <LibrarianDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/member"
          element={user?.role === 'Member' ? <MemberDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={
            user
              ? user.role === 'Librarian'
                ? <Navigate to="/librarian" />
                : <Navigate to="/member" />
              : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;