import React, {Component} from 'react';
import './general.css';
import Comics from './Comics';
import Navigation from './Navigation';

var ComicMain = props =>   {

   // console.log(props.location.pathname)
    return (
        <div>
            <Navigation  isComic = "true" type={`Comic`}  />
            <Comics pathName = {props.location.pathname} />
        </div>     
    );
}

export default ComicMain;