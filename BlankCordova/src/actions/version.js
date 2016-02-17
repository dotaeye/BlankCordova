import * as versionTypes from '../contants/version';
import configs from '../configs'

export function loadVersion() {
    return {
        type: versionTypes.VERSION_LOAD
    }
}

export function readVersion(version) {
    return {
        type: versionTypes.VERSION_READ,
        result: version
    }
}