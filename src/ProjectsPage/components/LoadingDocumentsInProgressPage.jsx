import React, { Component } from 'react';

class LoadingDocumentsInProgressPage extends Component {
  render() {
    return (
      <div className="resultsDIV">
        <div className="resultsOverview">
          <h2>Dokumente des Projekts "{this.props.projectTitle}"</h2>
        </div>
        <p className="resultsContent"><img src="./icons/in-progress.gif" alt="In Progress" className="progressAnimation" />&nbsp;Daten werden abgerufen...</p>
      </div>
    );
  }
}

export { LoadingDocumentsInProgressPage };