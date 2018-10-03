import React from 'react';
import { connect } from 'react-redux';
import { projectDocActions, alertActionsProjectMgmt, alertActionsUserMgmt } from '../_actions';
import { ProjectsDropdown } from './components';

class CreateProjectDocument extends React.Component {
    constructor(props) {
        super(props);

        // if the redux store contains project items, then retrieve the project_id of the first project
        const { listOfRIS_Projects } = this.props;
        let project_id = '';
        if (listOfRIS_Projects && !listOfRIS_Projects.isEmpty()) {
          project_id = listOfRIS_Projects.projects[0].id;
        }
        
        //the state contains the result item's information, ready to be stored in the database
        const { risSearchResultItem } = this.props;
        this.state = {
            projectDoc: {
                project_id: project_id,
                rechtsquelle: risSearchResultItem.rechtsquelle,
                headline: risSearchResultItem.headline,
                maintext: risSearchResultItem.resultInfoText,
                smallprint: risSearchResultItem.resultSmallprint,
                web_url: risSearchResultItem.weblinks.web_url,
                pdf_url: risSearchResultItem.weblinks.pdf_url,
                doc_url: risSearchResultItem.weblinks.doc_url,
                gesamt_url: risSearchResultItem.weblinks.gesamt_url
            },
            submitted: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.changeToLogin = this.changeToLogin.bind(this);
        this.changeToCreateProject = this.changeToCreateProject.bind(this);
    }

    render() {
        const { user, listOfRIS_Projects, creatingProjectDoc  } = this.props;
        const { projectDoc, submitted } = this.state;

        if (!user) {
            return (
                <div className="col-md-auto">
                    <h2>Dokument speichern</h2>
                    <p>Du bist nicht eingeloggt! Um ein Dokument in einem Projekt-Ordner speichern zu können, musst du über ein Nutzerkonto verfügen.</p>
                    <form name="form">
                        <div className="form-group">
                            <button className="btn btn-primary" type="button" onClick={this.changeToLogin}>Zum Login...</button>&nbsp;
                            <button className="btn btn-default" type="button" onClick={this.handleExit}>Abbrechen</button>
                        </div>
                    </form>
                </div>
              );
        } else if (!listOfRIS_Projects) { // projects have not been succesfully retrieved yet
            return (
                <div className="col-md-auto">
                    <h2>Dokument speichern</h2>
                    <div className="progressAniBox">
                        <img src="./icons/in-progress.gif" className="progressAniCenter" alt="In Progress" />             
                    </div>
                </div>
              );
        } else if (listOfRIS_Projects.isEmpty()) {
            return (
                <div className="col-md-auto">
                    <h2>Dokument speichern</h2>
                    <p>Keine Projekt-Ordner vorhanden! Um ein Dokument speichern zu können, musst du zuerst ein Projekt anlegen.</p>
                    <form name="form">
                        <div className="form-group">
                            <button className="btn btn-primary" type="button" onClick={this.changeToCreateProject}>Projekt anlegen</button>&nbsp;
                            <button className="btn btn-default" type="button" onClick={this.handleExit}>Abbrechen</button>
                        </div>
                    </form>
                </div>
              );
        } else {
            return (
                <div className="col-md-auto">
                    <h2>Dokument speichern</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="project">Im Projekt-Ordner</label><br />
                          <ProjectsDropdown projects={listOfRIS_Projects.projects} projectId={projectDoc.project_id} callHandleChange={this.handleChange} />
                        </div>
                        <div className={'form-group' + (submitted && !projectDoc.maintext ? ' has-error' : '')}>
                          <label htmlFor="maintext">Beschreibungstext</label>
                          <textarea type="text" className="form-control" name="maintext" rows="5" style={{resize: 'none'}}
                           value={projectDoc.maintext} onChange={this.handleChange} />
                          {submitted && !projectDoc.maintext &&
                              <div className="help-block">Bitte Beschreibungstext eingeben</div>
                          }
                        </div>
                        {creatingProjectDoc && (
                          <div className="progressAniBox">
                            <img src="./icons/in-progress.gif" className="progressAniCenter" alt="In Progress" />             
                          </div>
                        )}
                        {!creatingProjectDoc && (
                          <div className="form-group">
                            <button className="btn btn-primary" type="submit">Speichern</button>&nbsp;
                            <button className="btn btn-default" type="button" onClick={this.handleExit}>Abbrechen</button>
                          </div>
                        )}
                    </form>
                </div>
              );
        }
    }

    // save changes in the form to the component's state
    handleChange(event) {
        const { name, value } = event.target;
        const { projectDoc } = this.state;
        this.setState({
            projectDoc: {
                ...projectDoc,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { dispatch } = this.props;
        const { projectDoc } = this.state;

        // only if the user has input a maintext, the document is stored in the database
        if (projectDoc.maintext) {
            dispatch(projectDocActions.create(this.state.projectDoc));
        }
    }

    handleExit(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        //pass 'Clear' to Redux-Store to exit the create project document window
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange("Clear"));
    }

    changeToLogin(e) {
        const { dispatch } = this.props;

        //pass 'Clear' to Redux-Store to exit the create project document window
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));

        //pass 'Login' to Redux-Store to show the login window
        dispatch(alertActionsUserMgmt.clearAndOverlayChange('Login'));
    }

    changeToCreateProject(e) {
        const { dispatch } = this.props;

        //pass 'Clear' to Redux-Store to exit the create project document window
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange('CreateProject'));
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { listOfRIS_Projects } = state.projects;
    const { risSearchResultItem, creatingProjectDoc } = state.projectDocs;
    return {
        user,
        listOfRIS_Projects,
        risSearchResultItem,
        creatingProjectDoc
    };
}

const connectedCreateProjectDocPage = connect(mapStateToProps)(CreateProjectDocument);
export { connectedCreateProjectDocPage as CreateProjectDocument };