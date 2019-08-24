import React, { Component } from 'react';
import { DocumentLinkButtons, AddDocButton } from './';

class SearchResultsGrid extends Component {
  render() {
    // TODO: Not using HighlightSearchTerm component until I figure out a more stable implementation of my HTML crawler
    // const { results, searchTerm } = this.props;
    const { results } = this.props;
    return (
      <div className="resultsGrid">
        {results.resultsArray.map(function(item, i){
          const itemNr = (results.pageNumber - 1) * 20 + i + 1;
          return (
            <div key={itemNr} className="resultBox">
              <div className="itemNrDIV">#{itemNr}</div>
              <h4 className="bottomLine">{item.headline}</h4>
              <p className="resultInfoText">{item.resultInfoText}</p>
              { /* searchTerm && <HighlightSearchTerm searchTerm={searchTerm} urlToCrawl={item.weblinks.web_url} /> **/}
              <p className="buttonAndLinksDIV bottomLine">
                <DocumentLinkButtons weblinks={item.weblinks} /> &nbsp;
                <AddDocButton resultItem={item} />
              </p>
              <p className="resultSmallInfoText">{item.resultSmallprint}</p>
            </div>
          );
        })}
        <div className="placeholder"></div>
        <div className="placeholder"></div>
        <div className="placeholder"></div>
        <div className="placeholder"></div>
      </div>
    );
  }
}

export { SearchResultsGrid };