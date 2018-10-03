import React, { Component } from 'react';

class NoProjectsStoredPage extends Component {
  render() {
    return (
      <div className="projectListWrapper">
        <h2>Meine Projekte</h2>
        <p>Keine Projekte vorhanden!</p>
        <button id="CreateProject" className="btn btn-default btn-sm vAlignBottom" title="Neues Projekt anlegen" type="button" onClick={this.props.handleAddProjectButton}>
          <img src="./icons/add-document.svg" height="15px" alt="" />
        </button>
      </div> 
    );
  }
}

export { NoProjectsStoredPage };