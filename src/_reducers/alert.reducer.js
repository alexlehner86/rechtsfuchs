import { alertConstants } from '../_constants';

export {
  alertUserMgmt,
  alertSearchForm,
  alertProjectMgmt
}

function alertUserMgmt(state = {}, action) {
  switch (action.type) {
    case alertConstants.USERMGMT_SUCCESS:
      return {
        ...state,
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.USERMGMT_ERROR:
      return {
        ...state,
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.USERMGMT_CLEAR_AND_OVERLAY_CHANGE:
      //type and message are being left out and thereby cleared
      return {
        overlayToDisplay: action.overlayToDisplay
      };
    default:
      return state
  }
}

function alertSearchForm(state = {}, action) {
  switch (action.type) {
    case alertConstants.SEARCHFORM_SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.SEARCHFORM_ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.SEARCHFORM_CLEAR:
      return {};
    default:
      return state
  }
}

function alertProjectMgmt(state = {}, action) {
  switch (action.type) {
    case alertConstants.PROJECTMGMT_SUCCESS:
      return {
        ...state,
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.PROJECTMGMT_ERROR:
      return {
        ...state,
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.PROJECTMGMT_CLEAR_AND_OVERLAY_CHANGE:
      //type and message are being left out and thereby cleared
      return {
        overlayToDisplay: action.overlayToDisplay
      };
    default:
      return state
  }
}