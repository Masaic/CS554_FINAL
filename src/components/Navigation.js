import React from 'react';
import { NavLink } from 'react-router-dom';
import Searchbar from './Searchbar';
import './general.css';
//import SignOutButton from './SignOut'
//import {firebase} from '../firebase';
import logo from '../images/MarvelLogo.png';

const Navigation = (props) => {
    if (props.handleProfileChange) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} width="120" height="40" alt="" />
                    <strong>MarvelPedia</strong>
                </NavLink>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item navItems font-weight-bold">
                            <NavLink className="nav-link" exact to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold">
                            <NavLink className="nav-link" to="/heros/">Heros</NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold">
                            <a className="nav-link" href = "/comics/1">Comics</a>
                        </li>
                    </ul>
                </div>

                <div id="LoggedDiv" className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item navItems">
                            <Searchbar type={props.type} handleProfileChange={props.handleProfileChange} />
                        </li>
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
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <NavLink className="navbar-brand" to="/">
                
                    <img src={'../images/MarvelLogo.png'} width="60" height="30" alt="" />
                    <strong>MarvelPedia</strong>
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
                            <a className = "nav-link" href = "/comics/1">Comics</a>
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