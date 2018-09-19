import React from 'react';
import { connect } from 'react-redux';
import { projectActions, alertActionsProjectMgmt } from '../_actions';

class DeleteProject extends React.Component {
    constructor(props) {
        super(props);

        const { projectItems, selectedProjectID } = this.props;
        const projectToDelete = projectItems.find( project => project.id === selectedProjectID );

        this.state = {
            project: {
                projectTitle: projectToDelete.projectTitle,
                id: projectToDelete.id
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    render() {
        const { deleting } = this.props;
        const { project } = this.state;

        return (
            <div className="col-md-auto">
                <h2>Projekt löschen</h2>
                <p>Willst du das Projekt <span className="makeBold">"{project.projectTitle}"</span> wirklich löschen? Alle im Projekt-Ordner abgespeicherten Dokumente werden ebenfalls gelöscht.</p>
                {deleting && (
                      <div className="progressAniBox">
                        <img src="./icons/in-progress.gif" className="progressAniCenter" alt="In Progress" />             
                      </div>
                )}
                {!deleting && (
                  <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <button className="btn btn-danger" type="submit">Bestätigen</button>&nbsp;
                        <button className="btn btn-default" type="button" onClick={this.handleExit}>Abbrechen</button>
                    </div>
                  </form>
                )}
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { project } = this.state;

        // delete the project and its documents
        dispatch(projectActions.delete(project.id));
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        // hide the delete project overlay
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));
    }
}

function mapStateToProps(state) {
    const projectItems = state.projects.items;
    const { selectedProjectID, deleting } = state.projects;
    return {
        projectItems,
        selectedProjectID,
        deleting
    };
}

const connectedDeleteProjectPage = connect(mapStateToProps)(DeleteProject);
export { connectedDeleteProjectPage as DeleteProject }; 