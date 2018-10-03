import React, { Component } from 'react';

class NoDocumentsStoredPage extends Component {
  render() {
    return (
      <div className="resultsDIV">
        <div className="resultsOverview">
          <h2>Dokumente des Projekts "{this.props.projectTitle}"</h2>
        </div>
        <p className="resultsContent">Keine Dokumente vorhanden!</p>
      </div> 
    );
  }
}

export { NoDocumentsStoredPage };