import React from 'react';
import Navigation from './Navigation';
import './LogIn_SignUp.css'
import api from '../api';
import cookie from 'react-cookies';

class LogIn_SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.switchPage = this.switchPage.bind(this);
    this.state = {
      logIn: true
    };
    this.logIn.bind(this);
    this.signUp.bind(this);
  }

  //Set new state
  async changeState() {
    this.setState({
      logIn: !this.state.logIn
    });
  }

  //Switch between log in page ans sign up page
  async switchPage() {
    await this.changeState();

    if (this.state.logIn) {
      document.getElementById("logInPart").style.setProperty('display', 'block');
      document.getElementById("signUpPart").style.setProperty('display', 'none');
      document.getElementById("clickToChange").setAttribute('text', 'Doesn\'t have an account? Click to sign up.');

    } else {
      document.getElementById("logInPart").style.setProperty('display', 'none');
      document.getElementById("signUpPart").style.setProperty('display', 'block');
      document.getElementById("clickToChange").setAttribute('text', 'Already have an account? Click to log in.');
    }
  }

  async logIn() {
    console.log('Called logIn()');
    let email = document.getElementById('logInEmail').value;
    let password = document.getElementById('logInPassword').value;
    try{
      let res = await api.signInWithEmailAndPassword(email, password);
      cookie.save('email', email, { path: '/' });
      window.location.href = document.referrer;
    } catch(e) {
      alert('Email or password invalid. Please try again.')
    }
  }
  
  async signUp() {
    let email = document.getElementById('signUpEmail').value;
    let password1 = document.getElementById('signUpPassword').value;
    let password2 = document.getElementById('passwordTwo').value;
    if (password1.length < 6) {
      alert("The password should at least have 6 characters.")
      return false;
    }
    if (password1 !== password2) {
      alert("Please make sure the two passwords are the same.");
      return false;
    }

    try {
      let res = await api.registerWithEmailAndPassword(email,password1);
      cookie.save('email', email, { path: '/' });
      window.location.href = document.referrer;
    } catch(e) {
      alert("The email has already been registered");
    }  
  }

  render() {
    let logInPage = (
      <div>
        <div>
          <Navigation handleProfileChange={this.handleProfileChange} />
        </div>
        <div className="logBackground">
          <div className="logAndSign rounded border test-align">
            <div id="logInPart">
              <div className="input row">
                <strong className="labelLen text-right">Email: </strong>
                <input type="text" className="form-control inputLen" id="logInEmail" />
              </div>
              <div className="input row">
                <strong className="labelLen text-right">Password: </strong>
                <input type="password" className="form-control inputLen" id="logInPassword" />
              </div>
              <a href="javascript:void(0)" onClick = {this.logIn} className="btn btn-primary btnProperty text-white font-weight-bold">Log in</a>
            </div>

            <div id="signUpPart">
              <div className="input row">
                <strong className="labelLen text-right">Email: </strong>
                <input type="test" className="form-control inputLen" id="signUpEmail" />
              </div>
              <div className="input row">
                <strong className="labelLen text-right">Password: </strong>
                <input type="password" className="form-control inputLen" id="signUpPassword" />
              </div>
              <div className="input row">
                <strong className="labelLen text-right">Reinput Password: </strong>
                <input type="password" className="form-control inputLen" id="passwordTwo" />
              </div>
              <a href="javascript:void(0)" onClick = {this.signUp} className="btn btn-success btnProperty text-white font-weight-bold">Sign up</a>
              <br/>
              <a href = "javascript:void(0)" onClick = {this.forgotPassword}>Forgot password?</a>
            </div>

            <div className="changePart">
              <a href="javascript:void(0)" id="clickToChange" onClick={this.switchPage}> Doesn't have an account? Click to sign up. </a>
            </div>
          </div>
        </div>
      </div>
    );



    return logInPage
  }
}

export default LogIn_SignUp;