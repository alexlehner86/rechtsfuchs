import React, { Component } from 'react';

class ProjectManagementButtons extends Component {
  render() {
    if (this.props.projectIsSelected) {
      return (
        <div className="buttonFloatRight">
         <button type="button" id="CreateProject" className="btn btn-default btn-sm vAlignBottom" title="Neues Projekt anlegen" onClick={this.props.handleButton}>
           <img src="./icons/add-document.svg" height="16px" alt="" />
         </button>
         <button type="button" id="EditProject" className="btn btn-default btn-sm vAlignBottom" title="Projekt bearbeiten" onClick={this.props.handleButton}>
           <img src="./icons/edit-document.svg" height="16px" alt="" />
         </button>
         <button type="button" id="DeleteProject" className="btn btn-default btn-sm vAlignBottom" title="Projekt löschen" onClick={this.props.handleButton}>
           <img src="./icons/delete-document.svg" height="16px" alt="" />
         </button>
        </div>
      )
    } else {
      return (
        <div className="buttonFloatRight">
         <button type="button" id="CreateProject" className="btn btn-default btn-sm vAlignBottom" title="Neues Projekt anlegen" onClick={this.props.handleButton}>
           <img src="./icons/add-document.svg" height="16px" alt="" />
         </button>
         <button type="button" id="EditProject" className="btn btn-default btn-sm vAlignBottom" disabled>
           <img src="./icons/edit-document.svg" height="16px" alt="" />
         </button>
         <button type="button" id="DeleteProject" className="btn btn-default btn-sm vAlignBottom" disabled>
           <img src="./icons/delete-document.svg" height="16px" alt="" />
         </button>
        </div>
      )
    }
  }
}

export { ProjectManagementButtons };