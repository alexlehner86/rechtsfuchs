import { searchRIS_Constants } from '../_constants';
import { searchRIS_Service } from '../_services';
import { alertActionsSearchForm } from '../_actions';

export const searchRIS_Actions = {
    fetchBundesrecht,
    clearBundesrecht,

    fetchLandesrecht,
    clearLandesrecht,

    fetchJustiz,
    clearJustiz,

    fetchVwGH,
    clearVwGH,

    fetchVfGH,
    clearVfGH
};

function fetchBundesrecht(searchQuery) {
    return dispatch => {
        if (searchQuery.isBrowseAction) dispatch(browseRequest(searchQuery));
        else dispatch(request(searchQuery));

        searchRIS_Service.fetchBundesrecht(searchQuery)
            .then(
                results => { 
                    dispatch(success(results));
                },
                error => {
                    dispatch(failure(error.toString()));

                    //show error message to the user
                    dispatch(alertActionsSearchForm.error(error.toString()));
                }
            );
    };

    function request(searchQuery) { return { type: searchRIS_Constants.BUNDESRECHT_REQUEST, searchQuery } }
    function browseRequest(searchQuery) { return { type: searchRIS_Constants.BUNDESRECHT_BROWSE_REQUEST, searchQuery } }
    function success(results) { return { type: searchRIS_Constants.BUNDESRECHT_SUCCESS, results } }
    function failure(error) { return { type: searchRIS_Constants.BUNDESRECHT_FAILURE, error } }
}

function clearBundesrecht() {
  return { type: searchRIS_Constants.BUNDESRECHT_CLEAR };
}

function fetchLandesrecht(searchQuery) {
    return dispatch => {
        if (searchQuery.isBrowseAction) dispatch(browseRequest(searchQuery));
        else dispatch(request(searchQuery));

        searchRIS_Service.fetchLandesrecht(searchQuery)
            .then(
                results => { 
                    dispatch(success(results));
                },
                error => {
                    dispatch(failure(error.toString()));

                    //show error message to the user
                    dispatch(alertActionsSearchForm.error(error.toString()));
                }
            );
    };

    function request(searchQuery) { return { type: searchRIS_Constants.LANDESRECHT_REQUEST, searchQuery } }
    function browseRequest(searchQuery) { return { type: searchRIS_Constants.LANDESRECHT_BROWSE_REQUEST, searchQuery } }
    function success(results) { return { type: searchRIS_Constants.LANDESRECHT_SUCCESS, results } }
    function failure(error) { return { type: searchRIS_Constants.LANDESRECHT_FAILURE, error } }
}

function clearLandesrecht() {
    return { type: searchRIS_Constants.LANDESRECHT_CLEAR };
}

function fetchJustiz(searchQuery) {
    return dispatch => {
        if (searchQuery.isBrowseAction) dispatch(browseRequest(searchQuery));
        else dispatch(request(searchQuery));

        searchRIS_Service.fetchVwGH(searchQuery)
            .then(
                results => { 
                    dispatch(success(results));
                },
                error => {
                    dispatch(failure(error.toString()));

                    //show error message to the user
                    dispatch(alertActionsSearchForm.error(error.toString()));
                }
            );
    };

    function request(searchQuery) { return { type: searchRIS_Constants.JUSTIZ_REQUEST, searchQuery } }
    function browseRequest(searchQuery) { return { type: searchRIS_Constants.JUSTIZ_BROWSE_REQUEST, searchQuery } }
    function success(results) { return { type: searchRIS_Constants.JUSTIZ_SUCCESS, results } }
    function failure(error) { return { type: searchRIS_Constants.JUSTIZ_FAILURE, error } }
}

function clearJustiz() {
    return { type: searchRIS_Constants.JUSTIZ_CLEAR };
}

function fetchVwGH(searchQuery) {
    return dispatch => {
        if (searchQuery.isBrowseAction) dispatch(browseRequest(searchQuery));
        else dispatch(request(searchQuery));

        searchRIS_Service.fetchVwGH(searchQuery)
            .then(
                results => { 
                    dispatch(success(results));
                },
                error => {
                    dispatch(failure(error.toString()));

                    //show error message to the user
                    dispatch(alertActionsSearchForm.error(error.toString()));
                }
            );
    };

    function request(searchQuery) { return { type: searchRIS_Constants.VWGH_REQUEST, searchQuery } }
    function browseRequest(searchQuery) { return { type: searchRIS_Constants.VWGH_BROWSE_REQUEST, searchQuery } }
    function success(results) { return { type: searchRIS_Constants.VWGH_SUCCESS, results } }
    function failure(error) { return { type: searchRIS_Constants.VWGH_FAILURE, error } }
}

function clearVwGH() {
  return { type: searchRIS_Constants.VWGH_CLEAR };
}

function fetchVfGH(searchQuery) {
    return dispatch => {
        if (searchQuery.isBrowseAction) dispatch(browseRequest(searchQuery));
        else dispatch(request(searchQuery));

        searchRIS_Service.fetchVfGH(searchQuery)
            .then(
                results => { 
                    dispatch(success(results));
                },
                error => {
                    dispatch(failure(error.toString()));

                    //show error message to the user
                    dispatch(alertActionsSearchForm.error(error.toString()));
                }
            );
    };

    function request(searchQuery) { return { type: searchRIS_Constants.VFGH_REQUEST, searchQuery } }
    function browseRequest(searchQuery) { return { type: searchRIS_Constants.VFGH_BROWSE_REQUEST, searchQuery } }
    function success(results) { return { type: searchRIS_Constants.VFGH_SUCCESS, results } }
    function failure(error) { return { type: searchRIS_Constants.VFGH_FAILURE, error } }
}

function clearVfGH() {
    return { type: searchRIS_Constants.VFGH_CLEAR };
}
