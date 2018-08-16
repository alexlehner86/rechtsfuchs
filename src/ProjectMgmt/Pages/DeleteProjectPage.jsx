import React from 'react';
import { connect } from 'react-redux';
import { projectActions, alertActionsProjectMgmt } from '../../_actions';

class DeleteProjectPage extends React.Component {
    constructor(props) {
        super(props);

        const { projectItems, selectedProject } = this.props;
        const projectToDelete = projectItems.find( project => project.id === selectedProject );

        this.state = {
            project: {
                projectTitle: projectToDelete.projectTitle,
                id: projectToDelete.id
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { project } = this.state;

        //Projekt und dessen Dokumente löschen
        dispatch(projectActions.delete(project.id));
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        //Delete-Project-Overlay verbergen
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));
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
}

function mapStateToProps(state) {
    const projectItems = state.projects.items;
    const { selectedProject, deleting } = state.projects;
    return {
        projectItems,
        selectedProject,
        deleting
    };
}

const connectedDeleteProjectPage = connect(mapStateToProps)(DeleteProjectPage);
export { connectedDeleteProjectPage as DeleteProjectPage }; 