import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectActions, projectDocActions, alertActionsProjectMgmt } from '../_actions';

import { ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import './ProjectsList.css';

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.handleButton = this.handleButton.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.createListGroupItems = this.createListGroupItems.bind(this);
  }

  handleButton(e) {
    const { dispatch } = this.props;

    //pass 'CreateProject', 'EditProject' or 'DeleteProject to Redux-Store to show corresponding page
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange(e.target.id));
  }

  handleSelect(e) {
    const { dispatch } = this.props;

    //id des ausgewählten Projekts im Redux-Store speichern
    dispatch(projectActions.selectProject(e.target.id));

    //Dokumente des ausgewählten Projekts aus der Datenbank laden
    dispatch(projectDocActions.getAllByProjectId(e.target.id));

    //Zum Anfang des ProjectDocuments-Elements scrollen, mit 0.5 Sekunden Verzögerung
    setTimeout(() => {
      document.getElementById('Documents-List').scrollIntoView(true);
    }, 500);
  }

  createListGroupItems(item, i) {
    const { selectedProject } = this.props;
    let numberOfDocsText = '';
    if (item.numberOfDocs === 1) numberOfDocsText = '1 Dokument';
    else numberOfDocsText = `${item.numberOfDocs} Dokumente`;

    if (selectedProject === item.id) {
      return (
        <ListGroupItem key={i} id={item.id} header={item.projectTitle} onClick={this.handleSelect} active>
          <span className="descriptionTextSelected">{item.description}</span><br />
          <span className="erstelltAmTextSelected">(erstellt am { moment(item.createdDate).format("DD.MM.YYYY") }, {numberOfDocsText})</span>
        </ListGroupItem>
      );
    } else {
      return (
        <ListGroupItem key={i} id={item.id} header={item.projectTitle} onClick={this.handleSelect}>
          <span className="descriptionText">{item.description}</span><br />
          <span className="erstelltAmText">(erstellt am { moment(item.createdDate).format("DD.MM.YYYY") }, {numberOfDocsText})</span>
        </ListGroupItem>
      );
    }
  }
  
  render() {
    //"projectItems" enthält die aktuellen Projekte des Users
    //"selectedProject" enthält den projectItems-Array-Index des ausgewählten Projekts
    const { projectItems, selectedProject } = this.props;

    return (
      <div>
        { /* Der Nutzer hat bereits Projekte angelegt */ }
        { projectItems.length > 0 && (
          <div className="col-md-auto">
            <h2 className="posRelative">
              Meine Projekte
              { /* Es ist bereits ein Projekt ausgewählt */ }
              { selectedProject !== undefined && (
               <div className="buttonFloatRight">
                <button type="button" id="CreateProject" className="btn btn-default btn-sm vAlignBottom" title="Neues Projekt anlegen" onClick={this.handleButton}>
                  <img src="./icons/add-document.svg" height="16px" alt="Neues Projekt anlegen" />
                </button>
                <button type="button" id="EditProject" className="btn btn-default btn-sm vAlignBottom" title="Projekt bearbeiten" onClick={this.handleButton}>
                  <img src="./icons/edit-document.svg" height="16px" alt="Projekt bearbeiten" />
                </button>
                <button type="button" id="DeleteProject" className="btn btn-default btn-sm vAlignBottom" title="Projekt löschen" onClick={this.handleButton}>
                  <img src="./icons/delete-document.svg" height="16px" alt="Projekt löschen" />
                </button>
               </div>
              )}
              { /* Derzeit ist kein Projekt ausgewählt */ }
              { selectedProject === undefined && (
               <div className="buttonFloatRight">
                <button type="button" id="CreateProject" className="btn btn-default btn-sm vAlignBottom" title="Neues Projekt anlegen" onClick={this.handleButton}>
                  <img src="./icons/add-document.svg" height="16px" alt="Neues Projekt anlegen" />
                </button>
                <button type="button" id="EditProject" className="btn btn-default btn-sm vAlignBottom" disabled>
                  <img src="./icons/edit-document.svg" height="16px" alt="Projekt bearbeiten" />
                </button>
                <button type="button" id="DeleteProject" className="btn btn-default btn-sm vAlignBottom" disabled>
                  <img src="./icons/delete-document.svg" height="16px" alt="Projekt löschen" />
                </button>
               </div>
              )}
            </h2>
            <ListGroup>
              {projectItems.map((item, i) => this.createListGroupItems(item, i))}
            </ListGroup>
          </div>
        )}
        { /* Der Nutzer hat noch keine Projekte angelegt */ }
        { projectItems.length === 0 && (
          <div className="col-md-auto">
            <h2>Meine Projekte</h2>
            <p>Keine Projekte vorhanden!</p>
            <button id="CreateProject" className="btn btn-default btn-sm vAlignBottom" title="Neues Projekt anlegen" type="button" onClick={this.handleButton}>
              <img src="./icons/add-document.svg" height="15px" alt="Neues Projekt anlegen" />
            </button>
          </div>  
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const projectItems = state.projects.items;
  const { selectedProject } = state.projects;
  return {
      projectItems,
      selectedProject
  };
}

const connectedProjectsList = connect(mapStateToProps)(ProjectsList);
export { connectedProjectsList as ProjectsList };