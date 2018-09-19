import React from 'react';
import { connect } from 'react-redux';
import { projectDocActions, searchRIS_Actions,
         alertActionsProjectMgmt, alertActionsUserMgmt } from '../_actions';
import { ProjectsDropdown } from './components';

class CreateProjectDocument extends React.Component {
    constructor(props) {
        super(props);

        // if the redux store contains project items, then retrieve the project_id of the first project
        const { projectItems } = this.props;
        let project_id = '';
        if (projectItems) {
          if (projectItems.length > 0) project_id = projectItems[0].id;
        }
        
        //the state contains the result item's information, ready to be stored in the database
        const risSearchResultItem = this.getRISsearchResultItem();
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
        const { user, projectItems, creatingProjectDoc  } = this.props;
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
        } else if (!projectItems) {
            return (
                <div className="col-md-auto">
                    <h2>Dokument speichern</h2>
                    <div className="progressAniBox">
                        <img src="./icons/in-progress.gif" className="progressAniCenter" alt="In Progress" />             
                    </div>
                </div>
              );
        } else if (projectItems.length === 0) {
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
                          <ProjectsDropdown projectItems={projectItems} projectId={projectDoc.project_id} callHandleChange={this.handleChange} />
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

    getRISsearchResultItem() {
        const { dispatch, searchRIS_Bundesrecht, searchRIS_Landesrecht, 
                searchRIS_VwGH, searchRIS_VfGH } = this.props;
        let risSearchResultItem = {};

        // Depending on which searchRIS-object in the redux store contains the "resultID"
        // the component's state is set with the data retrieved from the corresponding result item
        if (searchRIS_Bundesrecht.resultID !== undefined) {
            risSearchResultItem = searchRIS_Bundesrecht.results.resultsArray[searchRIS_Bundesrecht.resultID];
            
            //delete resultID from the redux store (by setting it as undefined)
            dispatch(searchRIS_Actions.addBundesrechtResult());

        } else if (searchRIS_Landesrecht.resultID !== undefined) {
            risSearchResultItem = searchRIS_Landesrecht.results.resultsArray[searchRIS_Landesrecht.resultID];

            //delete resultID from the redux store (by setting it as undefined)
            dispatch(searchRIS_Actions.addLandesrechtResult());

        } else if (searchRIS_VfGH.resultID !== undefined) {
            risSearchResultItem = searchRIS_VfGH.results.resultsArray[searchRIS_VfGH.resultID];

            //delete resultID from the redux store (by setting it as undefined)
            dispatch(searchRIS_Actions.addVfGHResult());

        } else if (searchRIS_VwGH.resultID !== undefined) {
            risSearchResultItem = searchRIS_VwGH.results.resultsArray[searchRIS_VwGH.resultID];

            //delete resultID from the redux store (by setting it as undefined)
            dispatch(searchRIS_Actions.addVwGHResult());
        }

        return risSearchResultItem;
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
    const projectItems = state.projects.items;
    const { creatingProjectDoc } = state.projectDocs;
    const { searchRIS_Bundesrecht, searchRIS_Landesrecht, searchRIS_VwGH, searchRIS_VfGH } = state;
    return {
        user,
        projectItems,
        creatingProjectDoc,
        searchRIS_Bundesrecht,
        searchRIS_Landesrecht,
        searchRIS_VwGH,
        searchRIS_VfGH
    };
}

const connectedCreateProjectDocPage = connect(mapStateToProps)(CreateProjectDocument);
export { connectedCreateProjectDocPage as CreateProjectDocument };