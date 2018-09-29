import React, { Component } from 'react';

class SearchResultsBrowseButtons extends Component {
  render() {
    const { position } = this.props;

    return (
      <div className={'hCenterBrowseButtons' + position}>
        <div id={'BrowseBackward' + position} className="arrowLink" onClick={this.props.handleBrowseResults}>
          <img src="./icons/back.svg" alt="" />
        </div>
        <div id={'BrowseForward' + position} className="arrowLink" onClick={this.props.handleBrowseResults}>
          <img src="./icons/forward.svg" alt="" />
        </div>
      </div>
    );
  }
}

export { SearchResultsBrowseButtons };