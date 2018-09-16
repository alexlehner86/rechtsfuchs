import React from 'react';
import { connect } from 'react-redux';
import { projectDocActions, searchRIS_Actions,
         alertActionsProjectMgmt, alertActionsUserMgmt } from '../../_actions';
import { ProjectsDropdown } from './';
import $ from 'jquery';

//create links to external documents (PDF, DOC and webpage)
function buildDocumentUrlsObject(contentUrls) {
    
    let links = {};
    if (!$.isArray(contentUrls))
        contentUrls = [ contentUrls ];

    for (let x = 0; x < contentUrls.length; x++) {
          if (contentUrls[x].DataType === 'Pdf') {
            links.pdf_url = contentUrls[x].Url;
          } else if (contentUrls[x].DataType === 'Html') {
            links.web_url = contentUrls[x].Url; 
          } else if (contentUrls[x].DataType === 'Docx' || contentUrls[x].DataType === 'Rtf') {
            links.doc_url = contentUrls[x].Url;
          }
    }
    
    return links;
}

function getDocumentUrls(Dokumentliste) {
    var links = {};
    if (Dokumentliste && $.isArray(Dokumentliste.ContentReference)) {
        for (var i = 0, l = Dokumentliste.ContentReference.length; i < l; i++) {
            var o = Dokumentliste.ContentReference[i];
            if  (o.ContentType === "MainDocument") {
                links = buildDocumentUrlsObject(o.Urls.ContentUrl);
                break;
            }
        }
    } else {
        links = buildDocumentUrlsObject(Dokumentliste.ContentReference.Urls.ContentUrl);
    }
    return links;
}

class CreateProjectDocPage extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch, searchRIS_Bundesrecht, searchRIS_Landesrecht, 
                searchRIS_VwGH, searchRIS_VfGH, projectItems } = this.props;
        let resultItems = {};
        let resultID = 0;
        let myUrls = {};

        let rechtsquelle = '';
        let headline = '';
        let maintext = '';
        let smallprint = '';
        let web_url = '';
        let pdf_url = '';
        let doc_url = '';
        let gesamt_url = '';

        // if the redux store contains project items, then retrieve the project_id of the first project
        let project_id = '';
        if (projectItems) {
          if (projectItems.length > 0) project_id = projectItems[0].id;
        }

        // Depending on which searchRIS-object in the redux store contains the "resultID"
        // the component's state is set with the data retrieved from the corresponding result item
        if (searchRIS_Bundesrecht.resultID !== undefined) {
            resultID = searchRIS_Bundesrecht.resultID;
            resultItems = searchRIS_Bundesrecht.results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
            if (!$.isArray(resultItems)) {
                resultItems = [ resultItems ];
            }

            rechtsquelle = 'Bundesrecht';
            switch (resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Typ) {
                  case 'BVG':
                    headline = 'Bundesverfassungsgesetz';
                    break;
                  case 'BG':
                    headline = 'Bundesgesetz';
                    break;
                  case 'V':
                    headline = 'Verordnung';
                    break;
                  case 'K':
                    headline = 'Kundmachung';
                    break;
                  case 'Vertrag':
                    headline = 'Bundesgesetz';
                    break;
                  default:
                    headline = resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Typ;
            }
            maintext = resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].ArtikelParagraphAnlage
                       + ', ' + resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Kurztitel;
            smallprint = 'Inkrafttrete-Datum: ' + resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Inkrafttretedatum
            + '  |  ' + resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Kundmachungsorgan;
            gesamt_url = resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].GesamteRechtsvorschriftUrl;

            //delete resultID from the redux store (by setting it as undefined)
            dispatch(searchRIS_Actions.addBundesrechtResult());

        } else if (searchRIS_Landesrecht.resultID !== undefined) {
            resultID = searchRIS_Landesrecht.resultID;
            resultItems = searchRIS_Landesrecht.results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
            if (!$.isArray(resultItems)) {
                resultItems = [ resultItems ];
            }

            rechtsquelle = 'Landesrecht';
            let landesnormTyp = '';
            switch (resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Typ) {
                  case 'LVG':
                    landesnormTyp = 'Landesverfassungsgesetz';
                    break;
                  case 'LG':
                    landesnormTyp = 'Landesgesetz';
                    break;
                  case 'V':
                    landesnormTyp = 'Verordnung';
                    break;
                  case 'K':
                    landesnormTyp = 'Kundmachung';
                    break;
                  default:
                    landesnormTyp = resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Typ;
            }

            headline = resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Bundesland + ': ' + landesnormTyp;
            maintext = resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].ArtikelParagraphAnlage
                       + ', ' + resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Kurztitel;
            smallprint = 'Inkrafttrete-Datum: ' + resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Inkrafttretedatum
            + '  |  ' + resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].Kundmachungsorgan;
            gesamt_url = resultItems[resultID].Data.Metadaten['Bundes-Landesnormen'].GesamteRechtsvorschriftUrl;

            //delete resultID from the redux store (by setting it as undefined)
            dispatch(searchRIS_Actions.addLandesrechtResult());

        } else if (searchRIS_VfGH.resultID !== undefined) {
            resultID = searchRIS_VfGH.resultID;
            resultItems = searchRIS_VfGH.results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
            if (!$.isArray(resultItems)) {
                resultItems = [ resultItems ];
            }

            rechtsquelle = 'Verfassungsgerichtshof';
            let geschaeftszahl = '';
            if ($.isArray(resultItems[resultID].Data.Metadaten['Judikatur'].Geschaeftszahl.item)) {
                geschaeftszahl = resultItems[resultID].Data.Metadaten['Judikatur'].Geschaeftszahl.item[resultItems[resultID].Data.Metadaten['Judikatur'].Geschaeftszahl.item.length - 1];
            } else {
                geschaeftszahl = resultItems[resultID].Data.Metadaten['Judikatur'].Geschaeftszahl.item;
            }

            headline = resultItems[resultID].Data.Metadaten['Judikatur'].Vfgh.Entscheidungsart;
            maintext = resultItems[resultID].Data.Metadaten['Judikatur'].Dokumenttyp
                       + ': ' + resultItems[resultID].Data.Metadaten['Judikatur'].Schlagworte;
            smallprint = 'Entscheidungsdatum: ' + resultItems[resultID].Data.Metadaten['Judikatur'].Entscheidungsdatum
                         + '  |  Geschäftszahl: ' + geschaeftszahl;

            //delete resultID from the redux store (by setting it as undefined)
            dispatch(searchRIS_Actions.addVfGHResult());

        } else if (searchRIS_VwGH.resultID !== undefined) {
            resultID = searchRIS_VwGH.resultID;
            resultItems = searchRIS_VwGH.results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
            if (!$.isArray(resultItems)) {
                resultItems = [ resultItems ];
            }

            rechtsquelle = 'Verwaltungsgerichtshof';
            let geschaeftszahl = '';
            if ($.isArray(resultItems[resultID].Data.Metadaten['Judikatur'].Geschaeftszahl.item)) {
                geschaeftszahl = resultItems[resultID].Data.Metadaten['Judikatur'].Geschaeftszahl.item[resultItems[resultID].Data.Metadaten['Judikatur'].Geschaeftszahl.item.length - 1];
            } else {
                geschaeftszahl = resultItems[resultID].Data.Metadaten['Judikatur'].Geschaeftszahl.item;
            }
            let beschreibungstext = resultItems[resultID].Data.Metadaten['Judikatur'].Schlagworte;
            if (beschreibungstext === undefined) beschreibungstext = 'Kein Beschreibungstext vorhanden';

            headline = resultItems[resultID].Data.Metadaten['Judikatur'].Vwgh.Entscheidungsart;
            maintext = resultItems[resultID].Data.Metadaten['Judikatur'].Dokumenttyp
                       + ': ' + beschreibungstext;
            smallprint = 'Entscheidungsdatum: ' + resultItems[resultID].Data.Metadaten['Judikatur'].Entscheidungsdatum
                         + '  |  Geschäftszahl: ' + geschaeftszahl;

            //delete resultID from the redux store (by setting it as undefined)
            dispatch(searchRIS_Actions.addVwGHResult());
        }

        //get document urls and, if existent, save them in the component's state
        myUrls = getDocumentUrls(resultItems[resultID].Data.Dokumentliste);
        if (myUrls.web_url) web_url = myUrls.web_url;
        if (myUrls.pdf_url) pdf_url = myUrls.pdf_url;
        if (myUrls.doc_url) doc_url = myUrls.doc_url;
        
        //the state now contains the result item's information, ready to be stored in the database
        this.state = {
            projectDoc: {
                project_id: project_id,
                rechtsquelle: rechtsquelle,
                headline: headline,
                maintext: maintext,
                smallprint: smallprint,
                web_url: web_url,
                pdf_url: pdf_url,
                doc_url: doc_url,
                gesamt_url: gesamt_url
            },
            submitted: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.changeToLogin = this.changeToLogin.bind(this);
        this.changeToCreateProject = this.changeToCreateProject.bind(this);
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
                          <label htmlFor="project">Im Projekt-Ordner</label>
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

const connectedCreateProjectDocPage = connect(mapStateToProps)(CreateProjectDocPage);
export { connectedCreateProjectDocPage as CreateProjectDocPage };