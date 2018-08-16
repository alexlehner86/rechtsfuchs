import { alertConstants } from '../_constants';

export const alertActionsProjectMgmt = {
    success,
    error,
    clearAndOverlayChange
};

function success(message) {
    return { type: alertConstants.PROJECTMGMT_SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.PROJECTMGMT_ERROR, message };
}

function clearAndOverlayChange(overlayToDisplay) {
    return { type: alertConstants.PROJECTMGMT_CLEAR_AND_OVERLAY_CHANGE, overlayToDisplay };
}