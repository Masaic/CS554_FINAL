import api from '../api';
import React, { Component } from 'react';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ comment: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.comment !== ''){
        const result = api.createComentByComicId(this.props.heroId,this.props.user,this.state.comment);
        result.then(
            this.props.rerender()
        )
    }
    }

    render() {
        return(
            <form className="commentform" onSubmit={this.handleSubmit}>
            <label>
                    Leave your comment:<br />
                    <input type="text" onChange={this.handleChange} />
            </label>
            <label>
                    <input type="submit" value="Submit" />
            </label>
            </form>
        )
    }

}
export default CommentForm;