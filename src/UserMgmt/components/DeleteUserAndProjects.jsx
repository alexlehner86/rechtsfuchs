import React from 'react';
import { connect } from 'react-redux';
import { ShowInProgressAnimation } from '.';
import { userActions, projectActions, alertActionsUserMgmt } from '../../_actions';

class DeleteUserAndProjects extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    render() {
        const { deleting, successfulDelete } = this.props;

        if (!successfulDelete) {
          return (
            <div className="col-md-auto">
                <h2>Konto löschen</h2>
                <p>Willst du wirklich dein Nutzer&shy;konto löschen? Alle damit verknüpften Projekt-Ordner und Dokumente werden ebenfalls gelöscht.</p>

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
        } else {
          // after user has been deleted: show success message and allow user to click "ok"
          return (
            <div className="col-md-auto">
                <h2>Achtung!</h2>
                <p>Du kannst weiterhin die Suche benutzen. Allerdings kannst du ohne Nutzer&shy;konto keine Such&shy;ergebnisse aus dem Rechts&shy;informations&shy;system in eigenen Projekt-Ordnern speichern.</p>
                <button className="btn btn-primary btn-block" type="button" onClick={this.handleExit}>OK</button>
            </div>
          );
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch, user, projectItems } = this.props;

        // delete user, their projects and documents
        dispatch(projectActions.deleteAllByUsername(user.username, projectItems));
        dispatch(userActions.delete(user._id));
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        dispatch(alertActionsUserMgmt.clearAndOverlayChange('Clear'));
    }
}

function mapStateToProps(state) {
    const { user, deleting, successfulDelete } = state.authentication;
    const projectItems = state.projects.items;
    return {
        user,
        deleting,
        successfulDelete,
        projectItems
    };
}

const connectedDeleteUserAndProjects = connect(mapStateToProps)(DeleteUserAndProjects);
export { connectedDeleteUserAndProjects as DeleteUserAndProjects }; 