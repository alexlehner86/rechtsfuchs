import { alertConstants } from '../_constants';

export const alertActionsSearchForm = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SEARCHFORM_SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.SEARCHFORM_ERROR, message };
}

function clear() {
    return { type: alertConstants.SEARCHFORM_CLEAR };
}