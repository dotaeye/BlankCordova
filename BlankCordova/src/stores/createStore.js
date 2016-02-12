import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import clientMiddleware from '../middleware/clientMiddleware'
import createLogger from 'redux-logger';
import configs from '../configs';

export default function createStore(client, storage) {
    const middleware = [clientMiddleware(client, storage)];
    let finalCreateStore;
    if(configs.product){
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }else{
        const DevTools = require('../containers/DevTools');
        finalCreateStore = compose(applyMiddleware(...middleware),
            DevTools.instrument()
        )(_createStore);
    }
    const reducer = require('../reducers');
    const store = finalCreateStore(reducer);
    if (!configs.product) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers'));
        });
    }
    return store;
}
