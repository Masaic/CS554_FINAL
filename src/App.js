import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//import Info from './Information'; 
// import Navigation from './components/Navigation';
import LogIn_SignUp from './components/LogIn_SignUp';
import comicList from './components/comicList';

// firebase api
import fire from './config/Fire';

class App extends Component {

  //Constructor
  constructor(props, context) {
    super(props, context);
    this.state = {
      home: true,
      user: null
    };
  }

  // authen state monitor
  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({user});
      } else {
        this.setState({user: null});
      }
    })
  }


 

  render() {   

    return (
      <Router>
      <div className="App">
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
