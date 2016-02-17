import 'babel-polyfill';
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createHashHistory, useBasename } from 'history'
import { DevTools } from './containers';
import createRoutes from './routes'
import createStore from './stores/createStore'
import ApiClient from './utils/ApiClient';
import fetchData from './utils/fetchData';
import { createStorage, setNamespace } from './utils/storage';
import configs from './configs';
import { loadAuthToken } from './actions/auth';
import { loadVersion } from './actions/version';

setNamespace('dotaeye');

const storage = createStorage();

const history = createHashHistory();

const client = new ApiClient();

const store = createStore(client, storage);

const token = storage.get(configs.authToken);

store.dispatch(loadAuthToken(token));
store.dispatch(loadVersion());

const routes = createRoutes(store);

window.React = React; // enable debugger

function UpdateRoute() {
    fetchData(store, this.state)
}

function startApp () {
    if (window.StatusBar) {
        window.StatusBar.styleDefault();
    }
    ReactDOM.render(
        <Provider store={store} key="provider">
            <Router routes={routes} history={history} onUpdate={UpdateRoute}/>
        </Provider>,
        document.getElementById('main')
    );
}

function onPause() {
    // TODO: 此应用程序已挂起。在此处保存应用程序状态。
}

function onResume() {
    // TODO: 此应用程序已重新激活。在此处还原应用程序状态。
}


if (!window.cordova) {
    startApp();
} else {
    document.addEventListener('deviceready', startApp, false);
    document.addEventListener( 'pause', onPause, false );
    document.addEventListener( 'resume', onResume, false );
}
