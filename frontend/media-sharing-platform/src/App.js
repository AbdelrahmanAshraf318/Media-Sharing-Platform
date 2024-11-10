import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import './App.css';


class App extends Component{
   render(){
    return (
      <div className="App">

        <Navbar dark color="primary">
          <div className='container'>
            <NavbarBrand href="/">Media Sharing Platform</NavbarBrand>
          </div>
        </Navbar>

        <SignUp />

      </div>
    );
   }
}

export default App;
