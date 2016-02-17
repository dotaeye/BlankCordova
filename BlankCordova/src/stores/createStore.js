import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import clientMiddleware from '../middleware/clientMiddleware'
import configs from '../configs';

export default function createStore(client, storage) {
    const middleware = [clientMiddleware(client, storage)];
    let finalCreateStore = applyMiddleware(...middleware)(_createStore);
    const reducer = require('../reducers');
    const store = finalCreateStore(reducer);
    return store;
}
