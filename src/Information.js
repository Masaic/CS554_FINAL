import React, { Component } from 'react';

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : undefined,
            imagePath : undefined
        };
    }

    componentWillMount() {
        this.setState({
            name : "Spider Man",
            imagePath : "https://apollo2.dl.playstation.net/cdn/UP9000/CUSA02299_00/FREE_CONTENTlfrM9XqFMPLKmUpQpxJS/PREVIEW_SCREENSHOT3_163995.jpg"
        });
    }
    render() {
        let body = null;
        body = (
            <div>

            </div>
        );
        return body;
    }   
}

export default Information;