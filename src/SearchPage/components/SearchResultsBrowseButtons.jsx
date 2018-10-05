import React, { Component } from 'react';

class SearchResultsBrowseButtons extends Component {
  render() {
    const { position } = this.props;

    return (
      <div className={'hCenterBrowseButtons' + position}>
        <button type="button" id={'BrowseBackward' + position} className="arrowButton" title="Vorherige Seite" onClick={this.props.handleBrowseResults}>
          <img src="./icons/back.svg" alt="" />
        </button>
        <button type="button" id={'BrowseForward' + position} className="arrowButton" title="Nächste Seite" onClick={this.props.handleBrowseResults}>
          <img src="./icons/forward.svg" alt="" />
        </button>
      </div>
    );
  }
}

export { SearchResultsBrowseButtons };