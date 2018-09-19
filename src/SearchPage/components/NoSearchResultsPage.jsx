import React, { Component } from 'react';

class NoSearchResultsPage extends Component {
  render() {
    return (
      <div className="resultsDIV">
          <div className="resultsOverview">
              <h1>{this.props.pageTitle}</h1>
          </div>
          <p className="resultsContent">Keine Suchergebnisse gefunden!</p>
      </div>
    );
  }
}

export { NoSearchResultsPage };