import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//import Info from './Information'; 
// import Navigation from './components/Navigation';
import LogIn_SignUp from './components/LogIn_SignUp';
import Comics from './components/Comics';

// firebase api
import fire from './config/Fire';

// authen api
import api from './api';


class App extends Component {

  //Constructor
  constructor(props, context) {
    super(props, context);
    this.state = {
      home: true,
      user: null
    };
  }

  componentDidMount () {
    this.authListener();
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

  // test button function by BoLi
  authenTest = async (event) => {
    event.preventDefault();
    await api.signInWithEmailAndPassword('ee06b056@gmail.com','006361');
    console.log(this.state.user);
  }


 

  render() {   

    return (
      <Router>
      <div className="App">
        <div className="App-body">

        <button onClick={this.authenTest}>Test</button>
        <button onClick={(e) => {e.preventDefault();fire.auth().signOut()}}>Logout</button>
        


        

        <Switch>
          <Route path = "/LogIn_SignUp" component = { LogIn_SignUp } />
          <Route exact path = "/" component = {Main} />
          <Route path = "/heros" component = {Main} />
          <Route path = "/comics/" component = { Comics } />
        </Switch>
        </div>
      </div>
      </Router>
    );
  }
}


export default App;
