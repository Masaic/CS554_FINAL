import React from 'react';
import {NavLink} from 'react-router-dom'
import Searchbar from './Searchbar';
import './general.css';
//import SignOutButton from './SignOut'
//import {firebase} from '../firebase';

class Navigation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "no name"
        }
    }

    handleProfileChange = profileName => {
        // This state change will force Profile component to be re-rendered
        this.setState({ name: profileName });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink class="navbar-brand" to="/">
                
                    <img src={'../images/MarvelLogo.png'} width="60" height="30" alt="" />
                    <strong>MarvelPedia</strong>
                </NavLink>
            
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul className = "navbar-nav">
                        <li className = "nav-item active navItems font-weight-bold">
                            <NavLink className = "nav-link" exact to="/">Home <span class = "sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold">
                            <NavLink className = "nav-link" to = "javscript:void(0)">Heros</NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold">
                            <NavLink className = "nav-link" to = "javscript:void(0)">Comics</NavLink>
                        </li>
                        <li className = "nav-item navItems font-weight-bold">
                            <NavLink className ="nav-link" to = "javscript:void(0)">Movies</NavLink>
                        </li>
                    </ul>
                </div>

                <div id = "LoggedDiv" className = "collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className = "nav-item navItems">
                            <Searchbar handleProfileChange={this.handleProfileChange} />
                        </li>
                        <li className="nav-item navItems font-weight-bold">
                            <NavLink className = "nav-link" to = "/LogIn_SignUp">Log in / Sign up</NavLink>
                        </li>
                        <li className="nav-item navItems font-weight-bold" style = {{'display':'none'}}>
                            <NavLink className = "nav-link" to = "/">Sign out</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
    

export default Navigation;