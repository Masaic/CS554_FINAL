import React from 'react';

import { NavLink } from 'react-router-dom';
import Searchbar from './Searchbar';
import './general.css';
//import SignOutButton from './SignOut'
//import {firebase} from '../firebase';
import api from '../api';
import logo from '../images/MarvelLogo.png';
// import { setupMaster } from 'cluster';

// Sign out function.
let signOut = async() => {
    console.log("shit");
    await api.signout();
    //window.location.href = '/';
    
}


const Navigation = (props) => {
    console.log(props.user);
   
    if (props.handleProfileChange) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <NavLink className="navbar-brand" to="/">
                    <img src={logo} width="130" height="40" alt="" />
                    <span className = "font-weight-bold nav-title">MarvelPedia</span>
                </NavLink>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item navItems font-weight-bold">
                            <NavLink className="nav-link" exact to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold">
                            <NavLink className="nav-link" to="/heros/">Heros</NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold">
                            <a className = {props.isComic ==='true' ? 'nav-link active' : 'nav-link'} href = "/comics/list/1">Comics</a>
                        </li>
                    </ul>
                </div>

                <div id="LoggedDiv" className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item navItems">
                            <Searchbar type={props.type} handleProfileChange={props.handleProfileChange} />
                        </li>
                        {
                            !!props.user  ?<li className = "nav-item"> <a className = "nav-link text-white font-weight-bold">{props.user.email}</a></li> :  null
                        }
                        {
                            !!props.user ?  <li className="nav-item navItems font-weight-bold">
                                                <a onClick = {signOut} className="nav-link" href = "javascript:void(0)">Sign out</a>
                                            </li>  
                                            :   <li className="nav-item navItems font-weight-bold">
                                                    <a  className="nav-link" href = "/logIn_signUp">Log in / Sign up</a>
                                                </li>
                        }
                        
                        
                    </ul>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <NavLink className="navbar-brand" to="/">

                    <img src={logo} width="130" height="40" alt="" />
                    <span className = "font-weight-bold nav-title">MarvelPedia</span>

                </NavLink>
            
                <div className="collapse navbar-collapse">
                    <ul className = "navbar-nav">

                        <li className = "nav-item navItems font-weight-bold">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold">
                            <NavLink className="nav-link" to="/heros">Heros</NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold">
                            <a className = {props.isComic ==='true' ? 'nav-link active' : 'nav-link'} href = "/comics/list/1">Comics</a>
                        </li>
                        
                    </ul>
                </div>

                <div id = "LoggedDiv" className = "collapse navbar-collapse justify-content-end">

                    <ul className="navbar-nav">
                        <li className="nav-item navItems font-weight-bold">
                            <NavLink className="nav-link" to="/LogIn_SignUp">Log in / Sign up</NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold" style={{ 'display': 'none' }}>
                            <NavLink className="nav-link" to="/">Sign out</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );

    }
}



export default Navigation;