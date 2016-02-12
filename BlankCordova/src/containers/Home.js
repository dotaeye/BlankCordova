import React, { Component } from 'react';
import { Route, Link, State, History,IndexLink} from 'react-router';

const Home = React.createClass({
    render() {
        return (
            <div id="home" className='container'>

                <h1>Home Page</h1>
                <Link to='/login'>Login page</Link>
                <Link to='/Register'>Register page</Link>
            </div>
        );
    }
});

var statics = {
    name: 'home'
};

export default Home;

