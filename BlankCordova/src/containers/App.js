import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { History,Link } from 'react-router'
import { IndexLink } from 'react-router';
import SQ from 'sq-components';
import configs from '../configs';
import * as authActions from '../actions/auth'

var App = React.createClass({

    mixins: [History],

    componentDidMount () {
        // Hide the splash screen when the app is mounted
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    },

    render() {
        const {auth:{token},query,children} = this.props;
        let viewKey = children.type.getViewKey(this.props);
        let transition = (query && query.transition) ? query.transition : null;
        let enableTransition = this.__viewKey != null && viewKey != this.__viewKey;
        this.__viewKey = viewKey;
        var transitionName = transition || 'fade-contract';
        return (
            <SQ.Box id="app" direction='column' fill>
                <SQ.Transition
                    transitionEnterEnabled={enableTransition}
                    transitionLeaveEnabled={enableTransition}
                    transitionName={transitionName}
                    viewKey={viewKey}
                    >
                    {children}
                </SQ.Transition>
            </SQ.Box>
        );
    }
});

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)