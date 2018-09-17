import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DocumentLinkButtons, AddDocButton } from './components';

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
    this.createDocumentLinkButtons = this.createDocumentLinkButtons.bind(this);
  }
  
  render() {
    const { fetchingData, results, pageTitle } = this.props.searchRIS_Data;
    const searchResultsDivID = 'SearchResults' + pageTitle;
  
    if (fetchingData) {
      return (
        <div className="resultsDIV">
          <div className="resultsOverview">
              <h1>{pageTitle}</h1>
          </div>
          <p className="resultsContent"><img src="./icons/in-progress.gif" alt="In Progress" className="progressAnimation" />&nbsp;Daten werden abgerufen...</p>
        </div>
      ); 
    } else if (results) {
      if (results.totalNumberOfHits > 0) {
        return (
           <div id={searchResultsDivID} className="resultsDIV">
             <div className="resultsOverview">
               <h1>{pageTitle}</h1><br />
               <p>(Seite {results.pageNumber} von {results.totalNumberOfPagesFormatted}, Anzahl Treffer: {results.totalNumberOfHitsFormatted})</p>
               <div id="BrowseBackw" className="arrowLink" onClick={this.handleBrowseResults}>
                 <img src="./icons/back.svg" alt="" />
               </div>
               <div id="BrowseForw" className="arrowLink" onClick={this.handleBrowseResults}>
                 <img src="./icons/forward.svg" alt="" />
               </div>
             </div>
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
             <div className="hCenterBrowseButtons">
               <div id="BrowseBackw-Bottom" className="arrowLink" onClick={this.handleBrowseResults}>
                 <img src="./icons/back.svg" alt="" />
               </div>
               <div id="BrowseForw-Bottom" className="arrowLink" onClick={this.handleBrowseResults}>
                 <img src="./icons/forward.svg" alt="" />
               </div>
             </div>
           </div>
      );
    } else {
         return (
           <div className="resultsDIV">
             <div className="resultsOverview">
               <h1>{pageTitle}</h1>
             </div>
             <p className="resultsContent">Keine Suchergebnisse gefunden!</p>
           </div>
          ); 
    } 
   } else return null;
  }

  handleBrowseResults(e) {
    const event = e || window.event;

    // if click-event was triggered by img-element, get parent-div that stores the id
    let eveTarget = event.target || event.srcElement;
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

  //create buttons that open the linked documents (PDF, DOC or webpage) in a new tab
  createDocumentLinkButtons(weblinks) {
    let links = [];   
    
 
    return <span>{links}</span>;
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedSearchResults = connect(mapStateToProps)(SearchResults);
export { connectedSearchResults as SearchResults }; 