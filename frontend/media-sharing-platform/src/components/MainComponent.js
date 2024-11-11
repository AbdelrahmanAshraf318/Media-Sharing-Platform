import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp';
import Header from './Header';
import Footer from './Footer';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component{
   render(){
    const Signup = () => {
        return(
            <SignUp />
        );
    }
    return (
      <div>
        <Header />
        <Route path="/signup" component={Signup} />
        <Redirect to="/signup" /> 
        <Footer />

      </div>
    );
   }
}

export default Main;
