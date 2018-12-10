import React, { Component } from 'react';
import imgNA from '../images/imgNA.jpg';
import {Link} from 'react-router-dom';
import './general.css';


var handleChange = (id, handle) => {
    console.log(id);
    handle(id);
}

const ComicItem = (props) => {
    let imgSrc = props.info.images.length > 0 ? `${props.info.images[0].path}.${props.info.images[0].extension}` : imgNA;
    return (
        <div className = "mx-auto one-card">
            <div className="card card-config">
                <img className="card-img-top card-img" src = {imgSrc} alt={props.info.title} />
                <div className="card-body ">
                    <h5 className="card-title card-intro">{props.info.title}</h5>
                    <Link to = {`/comics/detail/${props.info.id}`} onClick = {handleChange.bind(this, props.info.id, props.handle)} className="btn btn-primary">Check details</Link>
                </div>
            </div>
        </div>
    );
}

export default ComicItem;

