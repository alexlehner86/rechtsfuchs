import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRIS_Actions } from '../../_actions';
import { createDocumentLinkButtons } from './_helper';
import { AddDocButton } from './';

///////////////////////////////////////////////////////////
// Component: Renders search results retrieved from RIS //
/////////////////////////////////////////////////////////

class SearchResultsBundesrecht extends Component {
  constructor(props) {
    super(props);
    
    this.handleBrowseResults = this.handleBrowseResults.bind(this);
  }
  
  handleBrowseResults(e) {
    const event = e || window.event;
    let eveTarget = event.target || event.srcElement;

    // if click-event was triggered by img-element, get parent-div that stores the id
    while (eveTarget.nodeName !== 'DIV') {
      eveTarget = eveTarget.parentNode;
    }

    const { dispatch } = this.props;
    const { searchQuery, results } = this.props.searchRIS_Bundesrecht;
    const metaInfo = {};
    let newSearchQuery =  JSON.parse(JSON.stringify(searchQuery));
      
    // browse backward click (leftside arrow)
    if (eveTarget.id === 'BrowseBackw' || eveTarget.id === 'BrowseBackw-Bottom') {
      if ((metaInfo.aktSeitennummer - 1) >= 1) {
        // fetch data from the ris api and save it to the redux store
        newSearchQuery.seitennummer--;
        dispatch(searchRIS_Actions.fetchBundesrecht(newSearchQuery, true));

        if (eveTarget.id === 'BrowseBackw-Bottom')
          //scroll to the top of the "SearchResultsBundesrecht" element
          document.getElementById('SearchResultsBundesrecht').scrollIntoView(true);
      }
    // browse forward click (rightside arrow)  
    } else if (metaInfo.aktSeitennummer < metaInfo.maxSeitenNr) {
      // fetch data from the ris api and save it to the redux store
      newSearchQuery.seitennummer++;  
      dispatch(searchRIS_Actions.fetchBundesrecht(newSearchQuery, true));

      if (eveTarget.id === 'BrowseForw-Bottom')
          //scroll to the top of the "SearchResultsBundesrecht" element
          document.getElementById('SearchResultsBundesrecht').scrollIntoView(true);
    }
  }
  
  render() {
    const { fetchingData, results, pageTitle } = this.props.searchRIS_Bundesrecht;
    console.log(results);
  
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
           <div id="SearchResultsBundesrecht" className="resultsDIV">
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
                 let itemNr = (results.pageNumber - 1) * 20 + i + 1;
                 return (
                   <div key={itemNr} className="resultBox">
                     <div className="itemNrDIV">#{itemNr}</div>
                     <h4 className="bottomLine">
                       {item.headline}
                     </h4>
                     <p className="resultInfoText">
                       {item.resultInfoText}
                     </p>
                     <p className="buttonAndLinksDIV bottomLine">
                       {createDocumentLinkButtons(item.weblinks)}
                       {item.weblinks.gesamt_url && (
                          <a href={item.weblinks.gesamt_url} target="_blank" key="123">
                            <img src="./icons/gesamt-icon.svg" className="urlLinkIcon" alt="Gesamte Rechtsvorschrift" title="Gesamte Rechtsvorschrift in neuem Fenster öffnen" />
                          </a>
                       )}
                       &nbsp; <AddDocButton resultID={i} rechtsquelle='bundesrecht' />
                     </p>
                     <p className="resultSmallInfoText">
                       {item.resultSmallprint}
                     </p>
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
}

function mapStateToProps(state) {
  const { searchRIS_Bundesrecht } = state;
  return {
    searchRIS_Bundesrecht
  };
}

const connectedSearchResultsBundesrecht = connect(mapStateToProps)(SearchResultsBundesrecht);
export { connectedSearchResultsBundesrecht as SearchResultsBundesrecht };