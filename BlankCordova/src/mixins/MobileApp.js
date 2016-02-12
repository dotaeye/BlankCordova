/**
 * Created by navy on 16/1/2.
 */
import React from 'react';

const app = {
    navigationBars: {}
};
module.exports = {
    childContextTypes: {
        app: React.PropTypes.object
    },
    getChildContext () {
        return {
            app: app
        };
    }
};