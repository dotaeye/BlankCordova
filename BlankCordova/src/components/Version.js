import React, { PropTypes } from 'react';
import { History } from 'react-router';
import SQ from 'sq-components';
import SwipeableViews from 'react-swipeable-views';

const styles = {
    slide: {
        padding: 15,
        minHeight: 300,
        color: '#fff'
    },
    slide1: {
        background: '#FEA900'
    },
    slide2: {
        background: '#B3DC4A'
    },
    slide3: {
        background: '#6AC0FF'
    }
};

const Version = React.createClass({

    propTypes: {
        readVersion: PropTypes.func.isRequired
    },

    onReadVersion(){
        this.props.readVersion();
    },

    render() {
        return (
            <SwipeableViews>
                <div style={Object.assign({}, styles.slide, styles.slide1)}>
                    slide n¡ã1
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide2)}>
                    slide n¡ã2
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide3)}>
                    slide n¡ã3
                    <button type='button' onClick={this.onReadVersion}>go to Home</button>
                </div>
            </SwipeableViews>
        );
    }
});

export default Version;

