import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//import Info from './Information'; 
import Navigation from './Navigation';
import LogIn_SignUp from './LogIn_SignUp';



class App extends React.Component {

  //Constructor
  constructor(props, context) {
    super(props, context);
    this.state = {
      home: true
    };
  }


 

  render() {   

    return (
      <Router>
        <div className="App">

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <div>
            <Navigation />
          </div>
         
          <Route path = "/LogIn_SignUp" component = { LogIn_SignUp } />
          
        </div>
        
      </Router>  
    );
  }
}


export default App;
