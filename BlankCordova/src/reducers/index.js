import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import order from './order';
import version from './version';

export default combineReducers({
    form,
    auth,
    order,
    version
});
