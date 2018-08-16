import { alertConstants } from '../_constants';

export const alertActionsUserMgmt = {
    success,
    error,
    clearAndOverlayChange
};

function success(message) {
    return { type: alertConstants.USERMGMT_SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.USERMGMT_ERROR, message };
}

function clearAndOverlayChange(overlayToDisplay) {
    return { type: alertConstants.USERMGMT_CLEAR_AND_OVERLAY_CHANGE, overlayToDisplay };
}