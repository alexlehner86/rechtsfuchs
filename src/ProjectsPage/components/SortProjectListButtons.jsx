import React, { Component } from 'react';

class SortProjectListButtons extends Component {
  render() {
    switch (this.props.selectedSortLogic) {
      case 'alphabetically':
        return (
          <div className="sortProjectListButtons">
            <p>Sortieren:</p>
            <p id="alphabetically" className="activeSortLogic">alphabetisch</p>
            <p>|</p>
            <p id="chronologically" className="inactiveSortLogic" onClick={this.props.handleSortLogicChange}>chronologisch</p>
          </div>
        );
      case 'chronologically':
        return (
          <div className="sortProjectListButtons">
            <p>Sortieren:</p>
            <p id="alphabetically" className="inactiveSortLogic" onClick={this.props.handleSortLogicChange}>alphabetisch</p>
            <p>|</p>
            <p id="chronologically" className="activeSortLogic">chronologisch</p>
          </div>
        );
      default:
        console.log('SortProjectListButtons: Invalid selectedSortLogic!');
        return null;
    }
  }
}

export { SortProjectListButtons };