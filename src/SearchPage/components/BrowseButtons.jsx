import React, { Component } from 'react';

class BrowseButtonsAtTop extends Component {
  render() {
    return (
      <span>
        <div id="BrowseBackw" className="arrowLink" onClick={this.props.handleBrowseResults}>
          <img src="./icons/back.svg" alt="" />
        </div>
        <div id="BrowseForw" className="arrowLink" onClick={this.props.handleBrowseResults}>
          <img src="./icons/forward.svg" alt="" />
        </div>
      </span>
    );
  }
}

class BrowseButtonsAtBottom extends Component {
  render() {
    return (
      <div className="hCenterBrowseButtons">
        <div id="BrowseBackw-Bottom" className="arrowLink" onClick={this.props.handleBrowseResults}>
          <img src="./icons/back.svg" alt="" />
        </div>
        <div id="BrowseForw-Bottom" className="arrowLink" onClick={this.props.handleBrowseResults}>
          <img src="./icons/forward.svg" alt="" />
        </div>
      </div>
    );
  }
}

export { BrowseButtonsAtTop, BrowseButtonsAtBottom };