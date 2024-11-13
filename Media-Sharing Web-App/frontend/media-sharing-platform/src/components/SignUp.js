import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarBrand, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            username: '',
            touched: {
                name: false,
                email: false,
                password: false,
                username: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(name, email, password, username) {
        const errors = {
            name: '',
            email: '',
            password: '',
            username: ''
        };
        if (this.state.touched.name && (!this.state.name.trim() || this.state.name.length < 3)) {
            errors.name = 'Name must be at least one word and greater than 3 characters, Please try again!';
        }
        if (this.state.touched.password && this.state.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.state.touched.email && !emailPattern.test(this.state.email)) {
            errors.email = 'Please enter a valid email address.'
        }
        if (this.state.touched.username && this.state.username.length < 5) {
            errors.username = 'Username length should be >= 8 characters'
        }
        return errors;
    }

    async handleSubmit(event) {
        event.preventDefault();
        const errors = this.validate(this.state.name, this.state.email, this.state.password, this.state.username);
        if (Object.values(errors).some(error => error !== '')) {
            alert("Please fix the errors before submitting.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/signup', {
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            });
            alert('User created successfully');
        } catch (err) {
            alert('User registration failed');
        }

        console.log("Current state is: " + JSON.stringify(this.state));
        alert("Current state is: " + JSON.stringify(this.state));
    }

    

    

    render() {
        const errors = this.validate(this.state.name, this.state.email, this.state.password, this.state.username);
        const isFormValid = !Object.values(errors).some(error => error !== '');
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        value={this.state.name}
                                        valid={this.state.touched.name && errors.name === ''}
                                        invalid={this.state.touched.name && errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        valid={this.state.touched.email && errors.email === ''}
                                        invalid={this.state.touched.email && errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={10}>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        valid={this.state.touched.password && errors.password === ''}
                                        invalid={this.state.touched.password && errors.password !== ''}
                                        onBlur={this.handleBlur('password')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.password}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="username" md={2}>Username</Label>
                                <Col md={10}>
                                    <Input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        valid={this.state.touched.username && errors.username === ''}
                                        invalid={this.state.touched.username && errors.username !== ''}
                                        onBlur={this.handleBlur('username')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.username}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">Sign Up</Button>
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