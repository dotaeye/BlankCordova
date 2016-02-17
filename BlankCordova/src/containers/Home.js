import React, { Component } from 'react';
import {History, IndexLink, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import _ from 'lodash';
import SQ from 'sq-components';
import configs from '../configs';
import * as authActions from '../actions/auth'
import * as versionActions from '../actions/version'
import {Version} from '../components';
import connectStatic from '../utils/connectStatic'

const Home = React.createClass({

    onReadVersion(){
        this.props.versionActions.readVersion(configs.version);
    },

    renderHomeComponent(){
        return (
            <div>
                <h1>Home Page</h1>
                <Link to='/login'>Login page</Link>
                <Link to='/Register'>Register page</Link>
            </div>
        )
    },

    render() {
        const {version}=this.props;
        console.log(version,configs.version);
        let showVersion = !_.includes(version, configs.version);
        let HomeComponent = showVersion ? <Version readVersion={this.onReadVersion}/> : this.renderHomeComponent();
        let viewKey = showVersion ? 'version' : 'home';
        return (
            <SQ.Box id="home" direction='column' fill>
                <SQ.Transition
                    transitionEnterEnabled={!showVersion}
                    transitionLeaveEnabled={!showVersion}
                    transitionName='show-from-right'
                    viewKey={viewKey}
                    >
                    {HomeComponent}
                </SQ.Transition>
            </SQ.Box>
        );
    }
});

function mapStateToProps(state) {
    return {
        auth: state.auth,
        version: state.version
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        versionActions: bindActionCreators(versionActions, dispatch)
    }
}

const statics = {
    getViewKey(){
        return 'home'
    }
};

export default connectStatic(statics)(connect(mapStateToProps, mapDispatchToProps)(Home))

