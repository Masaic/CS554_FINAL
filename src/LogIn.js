import React from 'react';
import './LogIn.css'
class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.state = {
      logIn : true
    };
  }

  changeState() {
    this.setState({
      logIn : !this.state.logIn
    });

    if (this.state.logIn) {
      document.getElementById("logInPart").style.setProperty('display','block');
      document.getElementById("signUpPart").style.setProperty('display','none');
      document.getElementById("clickToSignUp").style.setProperty('display', 'block');
      document.getElementById("clickToLogIn").style.setProperty('display', 'none');
    } else {
      document.getElementById("logInPart").style.setProperty('display','none');
      document.getElementById("signUpPart").style.setProperty('display','block');
      document.getElementById("clickToSignUp").style.setProperty('display', 'none');
      document.getElementById("clickToLogIn").style.setProperty('display', 'block');
    }
  }

  render(){
    let logInPage = (
      <div className = "logBackground">
        <div className = "logAndSign rounded border test-align"> 
          <div id = "logInPart">
            <div className="input row">
              <strong className = "labelLen">Username: </strong>
              <input type="text" className="form-control inputLen" id = "logInUsername"></input>
            </div> 
            <div className="input row">
              <strong className = "labelLen">Password: </strong>
              <input type="password" className="form-control inputLen" id = "logInPassword"></input>
            </div>
            <a href = "#" className = "btn btn-primary btnProperty text-white font-weight-bold">Log in</a>
          </div>

          <div id = "signUpPart">
            <div className="input row">
              <strong className = "labelLen">Username: </strong>
              <input type="text" className="form-control inputLen" id = "signUpUsername"></input>
            </div> 
            <div className="input row">
              <strong className = "labelLen">Email: </strong>
              <input type="test" className="form-control inputLen" id = "signUpEmail"></input>
            </div>
            <div className="input row">
              <strong className = "labelLen">Password: </strong>
              <input type="password" className="form-control inputLen" id = "signUpPassword"></input>
            </div>
            <div className="input row">
              <strong className = "labelLen">Reinput Password: </strong>
              <input type="password" className="form-control inputLen" id = "passwordTwo"></input>
            </div>
            <a href = "#" className = "btn btn-success btnProperty text-white font-weight-bold">Sign up</a>
          </div>

          <div className = "changePart">
            <a id = "clickToSignUp" href = "#" onClick = {this.changeState}> Doesn't have an account? Click to sign up. </a>
            <a id = "clickToLogIn" href = "#" onClick = {this.changeState}> Already have an account? Click to log in. </a>
          </div>
        </div>      
      </div>
    );

   

    return logInPage
  }
}

export default ModalExample;