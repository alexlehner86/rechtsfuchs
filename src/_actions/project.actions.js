import { projectConstants } from '../_constants';
import { projectService, projectDocService } from '../_services';
import { alertActionsProjectMgmt } from './';

export const projectActions = {
    getAllByUsername,
    selectProject,
    create,
    update,
    delete: _delete,
    deleteAllByUsername
};

//Ruft alle Projekte eines Nutzers (=username) ab und fügt sie dem Redux-State hinzu
function getAllByUsername(username) {
    return dispatch => {

        projectService.getAllByUsername(username)
            .then(
                projects => dispatch(success(projects)),
                error => dispatch(failure(error.toString()))
            );
    };

    function success(projects) { return { type: projectConstants.GETPROJECTS_BYUSERNAME_SUCCESS, projects } }
    function failure(error) { return { type: projectConstants.GETPROJECTS_BYUSERNAME_FAILURE, error } }
}

function selectProject(selectedProject) {
    return dispatch => {
        dispatch( { type: projectConstants.SELECT_PROJECT, selectedProject } );
    }
}

//Legt ein neues Projekt in der DB an und fügt es dem projects-Array im Redux-State hinzu
function create(projectToCreate) {
    return dispatch => {
        dispatch(request(projectToCreate));

        projectService.create(projectToCreate)
            .then(
                project => { 
                    dispatch(success());
                    dispatch(alertActionsProjectMgmt.success('Projekt wurde erfolgreich angelegt'));

                    //Bei erfolgreichem Anlegen des Projekts in der DB werden die Projekte des...
                    //...Nutzers (=username) erneut von DB abgerufen (wo Projekt-ID generiert wurde)
                    dispatch(projectActions.getAllByUsername(projectToCreate.username));
                    
                    // Create-Project-Overlay nach ca. einer Sekunde verstecken
                    setTimeout(() => { 
                        dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));
                      }, 700);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActionsProjectMgmt.error(error.toString()));
                }
            );
    }; 

    function request(projectToCreate) { return { type: projectConstants.CREATE_PROJECT_REQUEST, projectToCreate } }
    function success(project) { return { type: projectConstants.CREATE_PROJECT_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.CREATE_PROJECT_FAILURE, error } }
}

function update(projectToChange) {
    return dispatch => {
        dispatch(request(projectToChange));

        projectService.update(projectToChange)
            .then(
                changedProject => { 
                    dispatch(success(projectToChange));
                    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActionsProjectMgmt.error(error.toString()));
                }
            );
    }; 

    function request(projectToChange) { return { type: projectConstants.UPDATE_PROJECT_REQUEST, projectToChange } }
    function success(changedProject) { return { type: projectConstants.UPDATE_PROJECT_SUCCESS, changedProject } }
    function failure(error) { return { type: projectConstants.UPDATE_PROJECT_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        projectService.delete(id)
            .then(
                project => {
                    //wenn Projekt erfolgreich gelöscht, dann auch alle Dokumente löschen
                    projectDocService.deleteAllByProjectId(id);

                    //erfolgreich gelöschtes Projekt aus Projects-Array entfernen --> success(id)
                    dispatch(success(id));
                    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: projectConstants.DELETE_PROJECT_REQUEST, id } }
    function success(id) { return { type: projectConstants.DELETE_PROJECT_SUCCESS, id } }
    function failure(error) { return { type: projectConstants.DELETE_PROJECT_FAILURE, error } }
}

//Löscht alle Projekte und Projekt-Dokumente eines Nutzers (=username) in der Datenbank
function deleteAllByUsername(username, projectItems) {
    return dispatch => {
        dispatch(request(username));

        projectService.deleteAllByUsername(username)
            .then(
                projects => {
                    //wenn Projekte erfolgreich gelöscht, dann auch alle Dokumente löschen
                    projectItems.forEach((item) => {
                      console.log('delete docs of project-id:', item.id);
                      projectDocService.deleteAllByProjectId(item.id);
                    });
                    dispatch(success());
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(username) { return { type: projectConstants.DEL_PROJECTS_BYUSERNAME_REQUEST, username } }
    function success(projects) { return { type: projectConstants.DEL_PROJECTS_BYUSERNAME_SUCCESS, projects } }
    function failure(error) { return { type: projectConstants.DEL_PROJECTS_BYUSERNAME_FAILURE, error } }
}