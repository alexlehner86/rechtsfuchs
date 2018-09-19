import React, { Component } from 'react';
import { DocumentLinkButtons, AddDocButton } from './';

class SearchResultsGrid extends Component {
  render() {
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
              <p className="buttonAndLinksDIV bottomLine">
                <DocumentLinkButtons weblinks={item.weblinks} /> &nbsp;
                <AddDocButton resultID={i} addSearchResults={results.reduxActions.addSearchResult} />
              </p>
              <p className="resultSmallInfoText">{item.resultSmallprint}</p>
          </div>
          );
        })}  
      </div>
    );
  }
}

export { SearchResultsGrid };