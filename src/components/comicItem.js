import React, { Component } from 'react';

class comicItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null
        };
    }
    render() {
        return (
            <div>
                This is a test.
                {this.props.id}
            </div>
        );
    }
}

export default comicItem;