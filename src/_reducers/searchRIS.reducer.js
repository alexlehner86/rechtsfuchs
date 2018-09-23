import { searchRIS_Constants } from '../_constants';

export function searchRIS_Bundesrecht(state = {}, action) {
  switch (action.type) {
    case searchRIS_Constants.BUNDESRECHT_REQUEST:
      return {
        ...state,
        pageTitle: 'Bundesrecht',
        fetchingData: true,
        searchQuery: action.searchQuery
      };
    case searchRIS_Constants.BUNDESRECHT_BROWSE_REQUEST:
      return {
        ...state,
        searchQuery: action.searchQuery
      };
    case searchRIS_Constants.BUNDESRECHT_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        results: action.results
      };
    case searchRIS_Constants.BUNDESRECHT_FAILURE:
      return { 
        error: action.error
      };
    case searchRIS_Constants.BUNDESRECHT_CLEAR:
      return {};

    default:
      return state
  }
}

export function searchRIS_Landesrecht(state = {}, action) {
  switch (action.type) {
    case searchRIS_Constants.LANDESRECHT_REQUEST:
      return {
        ...state,
        pageTitle: 'Landesrecht',
        fetchingData: true,
        searchQuery: action.searchQuery
      };
    case searchRIS_Constants.LANDESRECHT_BROWSE_REQUEST:
      return {
        ...state,
        searchQuery: action.searchQuery
      };
    case searchRIS_Constants.LANDESRECHT_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        results: action.results
      };
    case searchRIS_Constants.LANDESRECHT_FAILURE:
      return { 
        error: action.error
      };
    case searchRIS_Constants.LANDESRECHT_CLEAR:
      return {};

    default:
      return state
  }
}

export function searchRIS_VwGH(state = {}, action) {
  switch (action.type) {
    case searchRIS_Constants.VWGH_REQUEST:
      return {
        ...state,
        pageTitle: 'Verwaltungsgerichtshof',
        fetchingData: true,
        searchQuery: action.searchQuery
      };
    case searchRIS_Constants.VWGH_BROWSE_REQUEST:
      return {
        ...state,
        searchQuery: action.searchQuery
      };
    case searchRIS_Constants.VWGH_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        results: action.results
      };
    case searchRIS_Constants.VWGH_FAILURE:
      return { 
        error: action.error
      };
    case searchRIS_Constants.VWGH_CLEAR:
      return {};

    default:
      return state
  }
}

export function searchRIS_VfGH(state = {}, action) {
  switch (action.type) {
    case searchRIS_Constants.VFGH_REQUEST:
      return {
        ...state,
        pageTitle: 'Verfassungsgerichtshof',
        fetchingData: true,
        searchQuery: action.searchQuery
      };
    case searchRIS_Constants.VFGH_BROWSE_REQUEST:
      return {
        ...state,
        searchQuery: action.searchQuery
      };
    case searchRIS_Constants.VFGH_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        results: action.results
      };
    case searchRIS_Constants.VFGH_FAILURE:
      return { 
        error: action.error
      };
    case searchRIS_Constants.VFGH_CLEAR:
      return {};

    default:
      return state
  }
}