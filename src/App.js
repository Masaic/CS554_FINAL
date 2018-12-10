import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import ComicsMain from './components/ComicsMain';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { savePDF } from '@progress/kendo-react-pdf';

//import Info from './Information'; 
// import Navigation from './components/Navigation';
import LogIn_SignUp from './components/LogIn_SignUp';

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
      rootRef: React.createRef()
    };
    
  }

  


  // pdf generator by Boli

  // pdfGenerator = () => {
  //   const root = this.myRef.current;
  //   savePDF(ReactDOM.findDOMNode(root),{paperSize: 'A4'});
  // }


  // test button function by BoLi
  authenTest = async (event) => {
    event.preventDefault();
    // await api.signInWithEmailAndPassword('ee06b056@gmail.com','006361');
    // await api.signInWithGoogleAccount();
    // console.log(this.state.user);
    // console.log(await api.registerWithEmailAndPassword('418907463@qq.com','123456'));
    const value = await api.getCommentsByComicId('33333');
    // console.log(value);
  }

  
  
  
  
  render() {
    if(this.state.user === `pending`){
      return <div>Loading</div>
    }   
    return (
      <Router>
      <div className="App" ref={this.myRef}>
        <div className="App-body">

      {/* <button onClick={this.authenTest}>test</button> */}


        <Switch>
          <Route path = "/LogIn_SignUp" component = { LogIn_SignUp } />
          <Route exact path = '/' component = {Main} />
          <Route path = '/heros' component = {Main} />
          <Route path = '/comics' component = {ComicsMain} />
        </Switch>
        </div>
      </div>
      </Router>
    );
  }
}


export default App;
/*
            <Route exact path = "/" component = {props => <Main {...props} user = {this.state.user} />} />
            <Route path = "/heros" component = {props => <Main {...props} user = {this.state.user} />}  />
            <Route path = "/comics/" component = {props => <Comics {...props} user = {this.state.user} />}  />
            */