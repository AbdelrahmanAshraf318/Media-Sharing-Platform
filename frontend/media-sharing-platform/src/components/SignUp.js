import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, NavbarBrand} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            username: ''
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                    <NavbarBrand href="/">Sign Up to the Platform</NavbarBrand>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form>
                            <FormGroup row>
                                <Label htmlFor="name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Input 
                                        type="text" 
                                        id="name" 
                                        placeholder="Name"  
                                        value={this.state.name} 
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input 
                                        type="email" 
                                        id="email" 
                                        placeholder="Email"  
                                        value={this.state.email} 
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={10}>
                                    <Input 
                                        type="password" 
                                        id="password" 
                                        placeholder="Password"  
                                        value={this.state.password} 
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="username" md={2}>Username</Label>
                                <Col md={10}>
                                    <Input 
                                        type="text" 
                                        id="username" 
                                        placeholder="Username"  
                                        value={this.state.username} 
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;