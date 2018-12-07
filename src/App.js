import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//import Info from './Information'; 
import Navigation from './components/Navigation';
import LogIn_SignUp from './components/LogIn_SignUp';
import comicList from './components/comicList';



class App extends Component {

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
        <div>
            <Navigation />
        </div>
        <div className="App-body">
        <Switch>
          <Route path = "/LogIn_SignUp" component = { LogIn_SignUp } />
          <Route exact path = "/" component = {Main} />
          <Route path = "/comicList/1" component = { comicList } />
        </Switch>
        </div>
      </div>
      </Router>
    );
  }
}


export default App;
