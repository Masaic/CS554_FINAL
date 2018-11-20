import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route} from 'react-router-dom';

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
        {/* <header className="App-header">
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
        </header> */}
        <br />
        <br />
        <div>
            <Navigation />
          </div>
         
          <Route path = "/LogIn_SignUp" component = { LogIn_SignUp } />
        <div className="App-body">
          <Route path="/" component={Main} />
        </div>
      </div>
      </Router>
    );
  }
}


export default App;
