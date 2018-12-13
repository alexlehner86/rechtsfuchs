import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchInProgressPage, SearchResultsGrid, NoSearchResultsPage, SearchResultsBrowseButtons } from './components';
import { climbUpDOMtreeUntilElementOfType } from '../_helpers';

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
    this.browseForwardClick = this.browseForwardClick.bind(this);
    this.fetchSearchResultsFromRISatPageNumber = this.fetchSearchResultsFromRISatPageNumber.bind(this);
    this.scrollToTheTopOfTheSearchResultsDiv = this.scrollToTheTopOfTheSearchResultsDiv.bind(this);
  }
  
  render() {
    const { fetchingData, browseRequestFetchingData, results, pageTitle } = this.props.searchRIS_Data;
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
          </div>

          {results.totalNumberOfHits > 20 && <SearchResultsBrowseButtons position="Top" handleBrowseResults={this.handleBrowseResults} /> }
          <SearchResultsGrid results={results} searchTerm={this.props.searchTerm} />
          {results.totalNumberOfHits > 20 && <SearchResultsBrowseButtons position="Bottom" handleBrowseResults={this.handleBrowseResults} /> }

          {browseRequestFetchingData && (
            <div className="browse-request-ongoing-overlay">
              <p>Daten werden abgerufen...</p>
            </div>
          )}
        </div>
      );
    }
    else {
      return <NoSearchResultsPage pageTitle={pageTitle} />
    } 
  }

  handleBrowseResults(e) {
    const event = e || window.event;
    let eventTarget = event.target || event.srcElement;
    eventTarget = climbUpDOMtreeUntilElementOfType(eventTarget, 'BUTTON');
  
    switch (eventTarget.id) {
      case 'BrowseBackwardTop':
        this.browseBackwardClick(isNotAtBottomOfPage);
        break;
      case 'BrowseBackwardBottom':
        this.browseBackwardClick(isAtBottomOfPage);
        break;
      case 'BrowseForwardTop':
        this.browseForwardClick(isNotAtBottomOfPage);
        break;
      case 'BrowseForwardBottom':
        this.browseForwardClick(isAtBottomOfPage);
        break;
      default:
        console.log('Button id not valid!');
    }
  }

  browseBackwardClick(atBottomOfPage) {
    const { results, searchQuery } = this.props.searchRIS_Data;
    
    if (results.pageNumber > 1) {
      this.fetchSearchResultsFromRISatPageNumber(searchQuery.pageNumber - 1);
      if (atBottomOfPage) {
        this.scrollToTheTopOfTheSearchResultsDiv();
      }
    }
  }

  browseForwardClick(atBottomOfPage) {
    const { results, searchQuery } = this.props.searchRIS_Data;

    if (results.pageNumber < results.totalNumberOfPages) {
      this.fetchSearchResultsFromRISatPageNumber(searchQuery.pageNumber + 1);
      if (atBottomOfPage) {
        this.scrollToTheTopOfTheSearchResultsDiv();
      }
    }
  }

  fetchSearchResultsFromRISatPageNumber(pageNumber) {
    const { dispatch, searchRIS_Data } = this.props;

    let newSearchQuery = JSON.parse(JSON.stringify(searchRIS_Data.searchQuery));
    newSearchQuery.pageNumber = pageNumber;
    newSearchQuery.isBrowseAction = true;
    dispatch(searchRIS_Data.results.reduxActions.fetchSearchResults(newSearchQuery));
  }

  scrollToTheTopOfTheSearchResultsDiv() {
    const { pageTitle } = this.props.searchRIS_Data;
    const searchResultsDivID = 'SearchResults' + pageTitle;
    document.getElementById(searchResultsDivID).scrollIntoView(true);
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedSearchResults = connect(mapStateToProps)(SearchResults);
export { connectedSearchResults as SearchResults }; 