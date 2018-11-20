import React from 'react';
import {NavLink} from 'react-router-dom'
//import SignOutButton from './SignOut'
//import {firebase} from '../firebase';
const Navigation = () =>
<div>
    <NavigationAuth />
</div>

const NavigationAuth = () =>
    <nav className="navigation">
        <NavLink exact to="/LogIn_SignUp" activeClassName='active'>Log in / Sign up</NavLink>
        
    </nav>

export default Navigation;