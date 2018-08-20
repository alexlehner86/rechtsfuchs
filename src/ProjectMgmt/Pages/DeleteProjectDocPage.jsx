import React from 'react';
import { connect } from 'react-redux';
import { projectDocActions, alertActionsProjectMgmt } from '../../_actions';

class DeleteProjectDocPage extends React.Component {
    constructor(props) {
        super(props);

        const { projectDocItems, selectedProjectDocID } = this.props;
        const projectDocToDelete = projectDocItems.find( projectDoc => projectDoc.id === selectedProjectDocID );

        this.state = {
            projectDoc: {
                id: projectDocToDelete.id,
                maintext: projectDocToDelete.maintext,
                project_id: projectDocToDelete.project_id
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { projectDoc } = this.state;

        //Dokument löschen
        dispatch(projectDocActions.delete(projectDoc));
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        //Delete-Project-Overlay verbergen
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));
    }

    render() {
        const { deleting } = this.props;
        const { projectDoc } = this.state;

        return (
            <div className="col-md-auto">
                <h2>Dokument löschen</h2>
                <p>Willst du das Dokument <span className="makeBold">"{projectDoc.maintext}"</span> wirklich löschen?</p>
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
    const projectDocItems = state.projectDocs.items;
    const { selectedProjectDocID, deleting } = state.projectDocs;
    return {
        projectDocItems,
        selectedProjectDocID,
        deleting
    };
}

const connectedDeleteProjectDocPage = connect(mapStateToProps)(DeleteProjectDocPage);
export { connectedDeleteProjectDocPage as DeleteProjectDocPage }; 