import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormTextareaObligatory, ShowInProgressAnimation } from '../../UserMgmt/components';
import { projectDocActions, alertActionsProjectMgmt, alertActionsUserMgmt } from '../../_actions';
import { ProjectsDropdown } from './';

class CreateProjectDocument extends Component {
    constructor(props) {
        super(props);
    
        this.changeToLogin = this.changeToLogin.bind(this);
        this.handleProjectMgmtChange = this.handleProjectMgmtChange.bind(this);
    }

    render() {
        const { user, listOfRIS_Projects } = this.props;

        if (!user) {
            return <LogInToCreateProjectDocumentPage changeToLogin={this.changeToLogin} handleProjectMgmtChange={this.handleProjectMgmtChange} />;
        }
        else if (!listOfRIS_Projects) { // projects have not been succesfully retrieved from database yet
            return (
                <div className="col-md-auto">
                    <h2>Dokument speichern</h2>
                    <ShowInProgressAnimation />
                </div>
              );
        } else if (listOfRIS_Projects.isEmpty()) {
            return <NoProjectsStoredPage handleProjectMgmtChange={this.handleProjectMgmtChange} />
        } 
        else {
            return <CreateProjectDocumentPage handleProjectMgmtChange={this.handleProjectMgmtChange} />;
        }
    }

    changeToLogin(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        //pass 'Clear' to Redux-Store to exit the create project document window
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));

        //pass 'Login' to Redux-Store to show the login window
        dispatch(alertActionsUserMgmt.clearAndOverlayChange('Login'));
    }

    handleProjectMgmtChange(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        //pass 'Clear' or 'CreateProject' to Redux-Store to exit or change to CreateProject
        dispatch(alertActionsProjectMgmt.clearAndOverlayChange(event.target.id));
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { listOfRIS_Projects } = state.projects;
    const { risSearchResultItem } = state.projectDocs;
    return {
        user,
        listOfRIS_Projects,
        risSearchResultItem
    };
}

const connectedCreateProjectDocument = connect(mapStateToProps)(CreateProjectDocument);
export { connectedCreateProjectDocument as CreateProjectDocument };


class LogInToCreateProjectDocumentPage extends Component {
    render() {
      return (
        <div className="col-md-auto">
            <h2>Dokument speichern</h2>
            <p>Du bist nicht eingeloggt! Um ein Dokument in einem Projekt-Ordner speichern zu können, musst du über ein Nutzerkonto verfügen.</p>
            <form name="form">
                <div className="form-group">
                    <button className="btn btn-primary" type="button" onClick={this.props.changeToLogin}>Zum Login...</button>&nbsp;
                    <button id="Clear" className="btn btn-default" type="button" onClick={this.props.handleProjectMgmtChange}>Abbrechen</button>
                </div>
            </form>
        </div>
      )
    }
  }

  class NoProjectsStoredPage extends Component {
    render() {
      return (
        <div className="col-md-auto">
            <h2>Dokument speichern</h2>
            <p>Keine Projekt-Ordner vorhanden! Um ein Dokument speichern zu können, musst du zuerst ein Projekt anlegen.</p>
            <form name="form">
                <div className="form-group">
                    <button id="CreateProject" className="btn btn-primary" type="button" onClick={this.props.handleProjectMgmtChange}>Projekt anlegen</button>&nbsp;
                    <button id="Clear" className="btn btn-default" type="button" onClick={this.props.handleProjectMgmtChange}>Abbrechen</button>
                </div>
            </form>
        </div>
      )
    }
  }

  class _CreateProjectDocumentPage extends Component {
    constructor(props) {
        super(props);

        const { listOfRIS_Projects, risSearchResultItem } = this.props;
        this.state = {
            projectDocument: this.createProjectDocumentObject(listOfRIS_Projects, risSearchResultItem),
            submitted: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { listOfRIS_Projects, creatingProjectDoc  } = this.props;
        const { project_id, maintext } = this.state.projectDocument;
        const { submitted } = this.state;

        return (
            <div className="col-md-auto">
                <h2>Dokument speichern</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <ProjectsDropdown projects={listOfRIS_Projects.projects} projectId={project_id} handleChange={this.handleChange} />
                    <FormTextareaObligatory inputObject={{maintext}} label="Beschreibungstext" submitted={submitted} handleChange={this.handleChange} />
     
                    {creatingProjectDoc && <ShowInProgressAnimation /> }
                    {!creatingProjectDoc && (
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Speichern</button>&nbsp;
                            <button id="Clear" className="btn btn-default" type="button" onClick={this.props.handleProjectMgmtChange}>Abbrechen</button>
                        </div>
                    )}
                </form>
            </div>
        );
    }

    createProjectDocumentObject(listOfRIS_Projects, risSearchResultItem) {
        return {
            project_id: listOfRIS_Projects.projects[0].id,
            rechtsquelle: risSearchResultItem.rechtsquelle,
            headline: risSearchResultItem.headline,
            maintext: risSearchResultItem.resultInfoText,
            smallprint: risSearchResultItem.resultSmallprint,
            web_url: risSearchResultItem.weblinks.web_url,
            pdf_url: risSearchResultItem.weblinks.pdf_url,
            doc_url: risSearchResultItem.weblinks.doc_url,
            gesamt_url: risSearchResultItem.weblinks.gesamt_url
        };
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { projectDocument } = this.state;
        this.setState({
            projectDocument: {
                ...projectDocument,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { projectDocument } = this.state;

        this.setState({ submitted: true });

        if (projectDocument.maintext) {
            dispatch(projectDocActions.create(projectDocument));
        }
    }
}

function mapStateToProps2(state) {
    const { listOfRIS_Projects } = state.projects;
    const { risSearchResultItem, creatingProjectDoc } = state.projectDocs;
    return {
        listOfRIS_Projects,
        risSearchResultItem,
        creatingProjectDoc
    };
}

const CreateProjectDocumentPage = connect(mapStateToProps2)(_CreateProjectDocumentPage);