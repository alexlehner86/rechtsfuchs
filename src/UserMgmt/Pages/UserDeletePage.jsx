import React from 'react';
import { connect } from 'react-redux';
import { userActions, projectActions, alertActionsUserMgmt } from '../../_actions';

class UserDeletePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch, user, projectItems } = this.props;

        //User und seine Projekte löschen
        dispatch(projectActions.deleteAllByUsername(user.username, projectItems));
        dispatch(userActions.delete(user._id));
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        //User-Delete-Overlay verbergen
        dispatch(alertActionsUserMgmt.clearAndOverlayChange('Clear'));
    }

    render() {
        const { deleting, successfulDelete } = this.props;

        if (!successfulDelete) {
          return (
            <div className="col-md-auto">
                <h2>Konto löschen</h2>
                <p>Willst du wirklich dein Nutzerkonto löschen? Alle damit verknüpften Projekt-Ordner werden ebenfalls gelöscht.</p>
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
        } else {
          //Nutzer wurde erfolgreich gelöscht: Erfolgsmeldung mit OK bestätigen
          return (
            <div className="col-md-auto">
                <button className="btn btn-default btn-block" type="button" onClick={this.handleExit}>OK</button>
            </div>
          );
        }
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

const connectedDeletePage = connect(mapStateToProps)(UserDeletePage);
export { connectedDeletePage as UserDeletePage }; 