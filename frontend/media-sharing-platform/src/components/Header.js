import React, { Component } from 'react';
import { 
  Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, 
  NavItem, Modal, ModalHeader, ModalBody, Button, 
  FormGroup, Label, Input, Form 
} from 'reactstrap';
import { NavLink, Navigate } from 'react-router-dom';
import axios from 'axios';
import withNavigate from './withNavigate';

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      isNavOpen: false,
      isModalOpen: false,
      isLoggedIn: !!(localStorage.getItem('token') || sessionStorage.getItem('token')),
      remember: false
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  async handleLogin(event) {
    event.preventDefault();
    this.toggleModal();

    const { username, password, remember } = this.state;

    try {
      const response = await axios.post('http://localhost:4000/api/login', { username, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { token } = response.data;
      
      if (remember) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      this.setState({ isLoggedIn: true });
      alert(`Welcome ${username}!`);

    } catch (err) {
      console.log(err);
      alert('Invalid username or password');
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.setState({ isLoggedIn: false });
    alert('You have been logged out.');

    this.props.navigate('/signup');
  }

  render() {
    return (
      <>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarBrand className="mr-auto" href="/">Media Sharing Platform</NavbarBrand>
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/about'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/contact'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {this.state.isLoggedIn ? (
                    <Button outline onClick={this.handleLogout}>
                      <span className='fa fa-sign-out fa-lg'></span> Logout
                    </Button>
                  ) : (
                    <Button outline onClick={this.toggleModal}>
                      <span className='fa fa-sign-in fa-lg'></span> Login
                    </Button>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input 
                  type="text" 
                  id="username" 
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input 
                    type="checkbox" 
                    name="remember"
                    checked={this.state.remember}
                    onChange={this.handleInputChange} 
                  /> Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" className="bg-primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
        
        {this.state.isLoggedIn && <Navigate to="/media-upload" replace />}
      </>
    );
  }
}

export default withNavigate(Header);
