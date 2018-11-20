import React, { Component } from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.profileName}
                </div>
                <Link activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '20px' }}>
                    Go to first element inside container
                </Link>

                <Link activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '20px' }}>
                    Go to second element inside container
                </Link>

                <Element name="test7" className="element" id="containerElement" style={{
                    position: 'relative',
                    height: '200px',
                    overflow: 'scroll',
                    marginBottom: '100px'
                }}>

                    <Element name="firstInsideContainer" style={{
                        marginBottom: '200px'
                    }}>
                        first element inside container
                </Element>

                    <Element name="secondInsideContainer" style={{
                        marginBottom: '200px'
                    }}>
                        second element inside container
                </Element>
                </Element>
            </div>
        )
    }

}

export default Profile;