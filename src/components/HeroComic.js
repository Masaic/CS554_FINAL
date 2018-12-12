import React, { Component } from 'react';

const HeroComic = (props) => {
    return (
        <div className = "mx-auto one-card">
            <div className="card card-config shadow-lg rounded">
                <img className="card-img-top card-img" src = {props.imgSrc} alt={props.title} />
                <div className="card-body bg-dark">
                    <h5 className="card-title card-intro text-white">{props.title}</h5>
                </div>
            </div>
        </div>
    );
}

export default HeroComic;