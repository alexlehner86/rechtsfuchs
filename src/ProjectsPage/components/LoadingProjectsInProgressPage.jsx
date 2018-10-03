import React, { Component } from 'react';

class LoadingProjectsInProgressPage extends Component {
  render() {
    return (
      <div className="projectListWrapper">
        <h2>Meine Projekte</h2>
        <p className="progressAniWrapper2"><img src="./icons/in-progress.gif" alt="" className="progressAnimation" />&nbsp;Daten werden abgerufen...</p>
      </div>
    );
  }
}

export { LoadingProjectsInProgressPage };