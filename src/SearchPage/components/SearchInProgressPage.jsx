import React, { Component } from 'react';

class SearchInProgressPage extends Component {
  render() {
    return (
      <div className="resultsDIV">
          <div className="resultsOverview">
              <h1>{this.props.pageTitle}</h1>
          </div>
          <p className="resultsContent"><img src="./icons/in-progress.gif" alt="" className="progressAnimation" />&nbsp;Daten werden abgerufen...</p>
      </div>
    );
  }
}

export { SearchInProgressPage };