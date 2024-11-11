import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp';
import Header from './Header';
import Footer from './Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import MediaUploadPage from './MediaUploadPage';

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
        
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route path="/media-upload" component={MediaUploadPage} />
          <Redirect to="/signup" /> 
        </Switch>
        
        <Footer />

      </div>
    );
   }
}

export default Main;
