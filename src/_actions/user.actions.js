import { userConstants } from '../_constants';
import { userService } from '../_services';
import { projectActions, alertActionsUserMgmt } from './';

export const userActions = {
    login,
    logout,
    register,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        //Datenbank abfragen
        userService.login(username, password)
            .then(
                user => { 
                    // erfolgreichen Login mitteilen
                    dispatch(success(user));
                    dispatch(alertActionsUserMgmt.success('Login erfolgreich'));

                    // Projekte des Users laden
                    dispatch(projectActions.getAllByUsername(user.username));

                    // Login-Overlay nach ca. einer Sekunde verstecken
                    setTimeout(() => { 
                      dispatch(alertActionsUserMgmt.clearAndOverlayChange('Clear'));
                    }, 700);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActionsUserMgmt.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(alertActionsUserMgmt.success('Registrierung war erfolgreich'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActionsUserMgmt.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActionsUserMgmt.success('Nutzerkonto erfolgreich gelöscht'));

                    //Wenn Nutzer erfolgreich gelöscht, dann ausloggen
                    dispatch(userActions.logout());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActionsUserMgmt.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: userConstants.DELETE_FAILURE, error } }
}