import React from 'react';
import { connect } from 'react-redux';
import { ShowInProgressAnimation } from '../../UserMgmt/components';
import { projectDocActions, alertActionsProjectMgmt } from '../../_actions';

class DeleteProjectDocument extends React.Component {
    constructor(props) {
        super(props);

        const { projectDocuments, selectedProjectDocID } = this.props;
        this.state = {
            projectDocument: projectDocuments.find( projectDoc => projectDoc.id === selectedProjectDocID )
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    render() {
        const { deleting } = this.props;
        const { projectDocument } = this.state;

        return (
            <div className="col-md-auto">
                <h2>Dokument löschen</h2>
                <p>Willst du das Dokument <span className="makeBold">"{projectDocument.maintext}"</span> wirklich löschen?</p>
                
                {deleting && <ShowInProgressAnimation /> }
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

    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { projectDocument } = this.state;

        dispatch(projectDocActions.delete(projectDocument));
    }

    handleExit(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));
    }
}

function mapStateToProps(state) {
    const projectDocuments = state.projectDocs.items;
    const { selectedProjectDocID, deleting } = state.projectDocs;
    return {
        projectDocuments,
        selectedProjectDocID,
        deleting
    };
}

const connectedDeleteProjectDocPage = connect(mapStateToProps)(DeleteProjectDocument);
export { connectedDeleteProjectDocPage as DeleteProjectDocument }; 