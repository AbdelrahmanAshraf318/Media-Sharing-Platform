import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp';
import Header from './Header';
import Footer from './Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import MediaUploadPage from './MediaUploadPage';
import MediaRetrievalPage from './MediaRetrievalPage';

// ProtectedRoute component
const ProtectedRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? <Element /> : <Navigate to="/signup" />;
};

class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/media-upload" element={<ProtectedRoute element={MediaUploadPage} />} />
          <Route path="/media-retrieval" element={<ProtectedRoute element={MediaRetrievalPage} />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
        
        <Footer />
      </div>
    );
  }
}

export default Main;