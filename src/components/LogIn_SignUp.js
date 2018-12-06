import React from 'react';
import './LogIn_SignUp.css'

class LogIn_SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.switchPage = this.switchPage.bind(this);
    this.state = {
      logIn : true
    };
  }
  
  //Set new state
  async changeState() {
    this.setState({
      logIn : !this.state.logIn
    });
  }

  //Switch between log in page ans sign up page
  async switchPage() {
    await this.changeState();

    if (this.state.logIn) {
      document.getElementById("logInPart").style.setProperty('display','block');
      document.getElementById("signUpPart").style.setProperty('display','none');
      document.getElementById("clickToChange").setAttribute('text', 'Doesn\'t have an account? Click to sign up.');
     
    } else {
      document.getElementById("logInPart").style.setProperty('display','none');
      document.getElementById("signUpPart").style.setProperty('display','block');
      document.getElementById("clickToChange").setAttribute('text', 'Already have an account? Click to log in.');
    }
  }

  render(){
    let logInPage = ( 
      <div className = "logBackground">
        <div className = "logAndSign rounded border test-align"> 
          <div id = "logInPart">
            <div className="input row">
              <strong className = "labelLen">Username: </strong>
              <input type="text" className="form-control inputLen" id = "logInUsername" />
            </div> 
            <div className="input row">
              <strong className = "labelLen">Password: </strong>
              <input type="password" className="form-control inputLen" id = "logInPassword" />
            </div>
            <a href = "javascript:void(0)" className = "btn btn-primary btnProperty text-white font-weight-bold">Log in</a>
          </div>

          <div id = "signUpPart">
            <div className="input row">
              <strong className = "labelLen">Username: </strong>
              <input type="text" className="form-control inputLen" id = "signUpUsername" />
            </div> 
            <div className="input row">
              <strong className = "labelLen">Email: </strong>
              <input type="test" className="form-control inputLen" id = "signUpEmail" />
            </div>
            <div className="input row">
              <strong className = "labelLen">Password: </strong>
              <input type="password" className="form-control inputLen" id = "signUpPassword" />
            </div>
            <div className="input row">
              <strong className = "labelLen">Reinput Password: </strong>
              <input type="password" className="form-control inputLen" id = "passwordTwo" />
            </div>
            <a href = "javascript:void(0)" className = "btn btn-success btnProperty text-white font-weight-bold">Sign up</a>
          </div>

          <div className = "changePart">
            <a href = "javascript:void(0)" id = "clickToChange"  onClick = {this.switchPage}> Doesn't have an account? Click to sign up. </a>
          </div>
        </div>      
      </div>
    );

   

    return logInPage
  }
}

export default LogIn_SignUp;