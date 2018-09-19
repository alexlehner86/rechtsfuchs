import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchInProgressPage, SearchResultsGrid, NoSearchResultsPage,
         BrowseButtonsAtTop, BrowseButtonsAtBottom } from './components';

const isAtBottomOfPage = true;
const isNotAtBottomOfPage = false;

///////////////////////////////////////////////////////////
// Component: Renders search results retrieved from RIS //
/////////////////////////////////////////////////////////

class SearchResults extends Component {
  constructor(props) {
    super(props);
    
    this.handleBrowseResults = this.handleBrowseResults.bind(this);
    this.browseBackwardClick = this.browseBackwardClick.bind(this);
    this.browseForwardClick  = this.browseForwardClick.bind(this);
  }
  
  render() {
    const { fetchingData, results, pageTitle } = this.props.searchRIS_Data;
    const searchResultsDivID = 'SearchResults' + pageTitle;
  
    if (fetchingData) {
      return <SearchInProgressPage pageTitle={pageTitle} />
    }
    else if (results.totalNumberOfHits > 0) {
        return (
           <div id={searchResultsDivID} className="resultsDIV">
             <div className="resultsOverview">
               <h1>{pageTitle}</h1><br />
               <p>(Seite {results.pageNumber} von {results.totalNumberOfPagesFormatted}, Anzahl Treffer: {results.totalNumberOfHitsFormatted})</p>
               <BrowseButtonsAtTop handleBrowseResults={this.handleBrowseResults} />
             </div>
             <SearchResultsGrid results={results} />
             <BrowseButtonsAtBottom handleBrowseResults={this.handleBrowseResults} />
           </div>
        );
    }
    else {
      return <NoSearchResultsPage pageTitle={pageTitle} />
    } 
  }

  handleBrowseResults(e) {
    const event = e || window.event;
    let eveTarget = event.target || event.srcElement;

    // if click-event was triggered by img-element, get parent-div that stores the id
    while (eveTarget.nodeName !== 'DIV') {
      eveTarget = eveTarget.parentNode;
    }
  
    switch (eveTarget.id) {
      case 'BrowseBackw':
        this.browseBackwardClick(isNotAtBottomOfPage);
        break;
      case 'BrowseBackw-Bottom':
        this.browseBackwardClick(isAtBottomOfPage);
        break;
      case 'BrowseForw':
        this.browseForwardClick(isNotAtBottomOfPage);
        break;
      case 'BrowseForw-Bottom':
        this.browseForwardClick(isAtBottomOfPage);
        break;
      default:
        console.log('button id not valid!');
    }
  }

  browseBackwardClick(atBottomOfPage) {
    const { dispatch, searchRIS_Data } = this.props;
    
    if (searchRIS_Data.results.pageNumber > 1) {
      // fetch data from the ris api and save it to the redux store
      let newSearchQuery = JSON.parse(JSON.stringify(searchRIS_Data.searchQuery));
      newSearchQuery.seitennummer--;
      newSearchQuery.isBrowseAction = true;
      dispatch(searchRIS_Data.results.reduxActions.fetchSearchResults(newSearchQuery));

      //scroll to the top of the current "SearchResults" element
      if (atBottomOfPage) {
        const searchResultsDivID = 'SearchResults' + searchRIS_Data.pageTitle;
        document.getElementById(searchResultsDivID).scrollIntoView(true);
      }
    }
  }

  browseForwardClick(atBottomOfPage) {
    const { dispatch, searchRIS_Data } = this.props;

    if (searchRIS_Data.results.pageNumber < searchRIS_Data.results.totalNumberOfPages) {
      // fetch data from the ris api and save it to the redux store
      let newSearchQuery = JSON.parse(JSON.stringify(searchRIS_Data.searchQuery));
      newSearchQuery.seitennummer++;
      newSearchQuery.isBrowseAction = true;
      dispatch(searchRIS_Data.results.reduxActions.fetchSearchResults(newSearchQuery));

      //scroll to the top of the current "SearchResults" element
      if (atBottomOfPage) {
        const searchResultsDivID = 'SearchResults' + searchRIS_Data.pageTitle;
        document.getElementById(searchResultsDivID).scrollIntoView(true);
      }
    }
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedSearchResults = connect(mapStateToProps)(SearchResults);
export { connectedSearchResults as SearchResults }; 