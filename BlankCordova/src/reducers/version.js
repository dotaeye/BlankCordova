import * as versionTypes from '../contants/version';

const initialState = [];

export default function version(state = initialState, action = {}) {
    switch (action.type) {
        case versionTypes.VERSION_READ:
            return [...state, action.result];
        case versionTypes.VERSION_LOAD:
            return state;
        default:
            return state;
    }
}

