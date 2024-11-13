import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp';
import Header from './Header';
import Footer from './Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import MediaDashboard from './MediaDashboard';

// ProtectedRoute component
const ProtectedRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? <Element /> : <Navigate to="/signup" />;
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!(localStorage.getItem('token') || sessionStorage.getItem('token')),
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />

          {/* Protected route for the combined dashboard */}
          <Route path="/media-dashboard" element={<ProtectedRoute element={MediaDashboard} />} />

          {/* Default route */}
          <Route path="*" element={<Navigate to={this.state.isLoggedIn ? "/media-dashboard" : "/signup"} />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;