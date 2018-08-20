import { projectDocConstants } from '../_constants';
import { projectService, projectDocService } from '../_services';
import { alertActionsProjectMgmt, projectActions } from './';

export const projectDocActions = {
    getAllByProjectId,
    create,
    selectProjectDoc,
    update,
    delete: _delete
};

//Ruft alle Projekt-Dokumente eines Projekts (=project_id) ab und fügt sie dem Redux-State hinzu
function getAllByProjectId(project_id) {
    return dispatch => {
        dispatch(request(project_id));

        projectDocService.getAllByProjectId(project_id)
            .then(
                projectDocs => dispatch(success(projectDocs)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(project_id) { return { type: projectDocConstants.GETPROJECTDOCS_BYPROJECTID_REQUEST, project_id } }
    function success(projectDocs) { return { type: projectDocConstants.GETPROJECTDOCS_BYPROJECTID_SUCCESS, projectDocs } }
    function failure(error) { return { type: projectDocConstants.GETPROJECTDOCS_BYPROJECTID_FAILURE, error } }
}

//Legt ein neues Projekt-Dokument in der DB an und fügt es dem projectDocs-Array im Redux-State hinzu
function create(projectDocToCreate) {
    return dispatch => {
        dispatch(request(projectDocToCreate));

        projectDocService.create(projectDocToCreate)
            .then(
                projectDoc => { 
                    dispatch(success());
                    dispatch(alertActionsProjectMgmt.success('Dokument wurde erfolgreich gespeichert'));

                    //Bei erfolgreichem Anlegen des Projekt-Dokuments in der DB werden:
                    // 1) der numberOfDocs-Zähler des Projekts (=project_id) um +1 erhöht
                    // 2) die Dokumente des Projekts erneut von DB abgerufen (wo ProjectDoc-ID generiert wurde)
                    // 3) das Projekt als selectedProject definiert, damit es gleich ausgewählt ist
                    // ...wenn der Nutzer zum Reiter "Projekte" wechselt
                    projectService.getById(projectDocToCreate.project_id)
                       .then(
                            projectToUpdate => {
                                projectToUpdate.numberOfDocs++;
                                dispatch(projectActions.update(projectToUpdate));
                                dispatch(projectDocActions.getAllByProjectId(projectDocToCreate.project_id));
                                dispatch(projectActions.selectProject(projectDocToCreate.project_id));
                            }
                       )
                    
                    // Create-ProjectDoc-Overlay nach ca. einer Sekunde verstecken
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

    function request(projectDocToCreate) { return { type: projectDocConstants.CREATE_PROJECTDOC_REQUEST, projectDocToCreate } }
    function success(projectDoc) { return { type: projectDocConstants.CREATE_PROJECTDOC_SUCCESS, projectDoc } }
    function failure(error) { return { type: projectDocConstants.CREATE_PROJECTDOC_FAILURE, error } }
}

function selectProjectDoc(selectedProjectDocID) {
    return dispatch => {
        dispatch( { type: projectDocConstants.SELECT_PROJECTDOC, selectedProjectDocID } );
    }
}

function update(projectDocToChange) {
    return dispatch => {
        dispatch(request(projectDocToChange));

        projectDocService.update(projectDocToChange)
            .then(
                changedProjectDoc => { 
                    dispatch(success(projectDocToChange));
                    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActionsProjectMgmt.error(error.toString()));
                }
            );
    }; 

    function request(projectToChange) { return { type: projectDocConstants.UPDATE_PROJECTDOC_REQUEST, projectToChange } }
    function success(changedProjectDoc) { return { type: projectDocConstants.UPDATE_PROJECTDOC_SUCCESS, changedProjectDoc } }
    function failure(error) { return { type: projectDocConstants.UPDATE_PROJECTDOC_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(projectDocToDelete) {
    return dispatch => {
        dispatch(request(projectDocToDelete));

        projectDocService.delete(projectDocToDelete.id)
            .then(
                project => {
                    //Bei erfolgreichem Löschen des Projekt-Dokuments in der DB wird
                    //...der numberOfDocs-Zähler des Projekts (=project_id) um -1 reduziert
                    projectService.getById(projectDocToDelete.project_id)
                       .then(
                            projectToUpdate => {
                                projectToUpdate.numberOfDocs--;
                                dispatch(projectActions.update(projectToUpdate));

                                //erfolgreich gelöschtes ProjectDoc aus Redux-Store entfernen
                                dispatch(success(projectDocToDelete.id));

                                //'DeleteProjectDoc'-Overlay verbergen
                                dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));
                            }
                       )
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(projectDocToDelete) { return { type: projectDocConstants.DELETE_PROJECTDOC_REQUEST, projectDocToDelete } }
    function success(id) { return { type: projectDocConstants.DELETE_PROJECTDOC_SUCCESS, id } }
    function failure(error) { return { type: projectDocConstants.DELETE_PROJECTDOC_FAILURE, error } }
}