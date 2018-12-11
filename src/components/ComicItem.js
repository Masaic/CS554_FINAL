import React, { Component } from 'react';
import imgNA from '../images/imgNA.jpg';
import {NavLink} from 'react-router-dom';
import './general.css';


var handleChange = (id, handle) => {
    console.log(id);
    handle(id);
}

class ComicItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: this.props.info.images.length > 0 ? `${this.props.info.images[0].path}.${this.props.info.images[0].extension}` : imgNA
        };
    }

    async handleChange(id) {
        await this.props.handleDetail(id);
    }
    render() {
        return (
            <div className = "mx-auto one-card">
                <div className="card card-config">
                    <img className="card-img-top card-img" src = {this.state.imgSrc} alt={this.props.info.title} />
                    <div className="card-body ">
                        <h5 className="card-title card-intro">{this.props.info.title}</h5>
                        <NavLink to = {`/comics/detail/${this.props.info.id}`} onClick = {this.handleChange.bind(this, this.props.info.id)} className="btn btn-primary">Check details</NavLink>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default ComicItem;

