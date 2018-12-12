import React, { Component } from 'react';

const HeroComic = (props) => {
    return (
        <div className = "mx-auto one-card">
            <div className="card card-config">
                <img className="card-img-top card-img" src = {props.imgSrc} alt={props.title} />
                <div className="card-body ">
                    <h5 className="card-title card-intro">{props.title}</h5>
                    {/* <NavLink to = {`/comics/detail/${this.props.info.id}`}
                     onClick = {this.handleChange.bind(this, this.props.info.id)} 
                     className="btn btn-primary">
                     Check details
                     </NavLink> */}
                </div>
            </div>
        </div>
    );
}

export default HeroComic;