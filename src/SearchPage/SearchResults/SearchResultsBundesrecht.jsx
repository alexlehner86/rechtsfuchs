import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRIS_Actions } from '../../_actions';
import { getMetaInfo, createdDocumentUrls } from './_helper';
import { AddDocButton } from './';
import $ from 'jquery';

///////////////////////////////////////////
// Component: Bundesrecht-Suchresultate //
/////////////////////////////////////////
  
class SearchResultsBundesrecht extends Component {
  constructor(props) {
    super(props);
    
    this.handleBrowseResults = this.handleBrowseResults.bind(this);
  }
  
  handleBrowseResults(e) {
    const event = e || window.event;
    let eveTarget = event.target || event.srcElement;

    const { dispatch } = this.props;
    const { searchQuery, results } = this.props.searchRIS_Bundesrecht;
    const metaInfo = getMetaInfo(results);
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
    const { fetchingData, results } = this.props.searchRIS_Bundesrecht;
  
    if (fetchingData) {
      return (
        <div className="resultsDIV">
          <div className="resultsOverview">
               <h1>Bundesrecht</h1>
               <p>(konsolidiert)</p>
          </div>
          <p className="resultsContent"><img src="./icons/in-progress.gif" alt="In Progress" className="progressAnimation" />&nbsp;Daten werden abgerufen...</p>
        </div>
      ); 
    } else if (results) {
      if (results.OgdSearchResult.OgdDocumentResults.Hits['#text'] > 0) {
        
      let resultItems = results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
      if (!$.isArray(resultItems)) {
        resultItems = [ resultItems ];
      }
      const metaInfo = getMetaInfo(results);

      return (
           <div id="SearchResultsBundesrecht" className="resultsDIV">
             <div className="resultsOverview">
               <h1>Bundesrecht</h1><br />
               <p>(konsolidiert, Seite {metaInfo.aktSeitennummer} von {metaInfo.maxSeiten}, Anzahl Treffer: {metaInfo.anzTreffer})</p>
               <div className="arrowLink">
                 <img src="./icons/back.svg" id="BrowseBackw" onClick={this.handleBrowseResults} alt="" />
               </div>
               <div className="arrowLink">
                 <img src="./icons/forward.svg" id="BrowseForw" onClick={this.handleBrowseResults} alt="" />
               </div>
             </div>
             <div className="resultsGrid">
               {resultItems.map(function(item, i){
                 let itemNr = (metaInfo.aktSeitennummer - 1) * 20 + i + 1;
                 let bundesnormTyp = '';
                 switch (item.Data.Metadaten['Bundes-Landesnormen'].Typ) {
                  case 'BVG':
                    bundesnormTyp = 'Bundesverfassungsgesetz';
                    break;
                  case 'BG':
                    bundesnormTyp = 'Bundesgesetz';
                    break;
                  case 'V':
                    bundesnormTyp = 'Verordnung';
                    break;
                  case 'K':
                    bundesnormTyp = 'Kundmachung';
                    break;
                  case 'Vertrag':
                    bundesnormTyp = 'Bundesgesetz';
                    break;
                  default:
                    bundesnormTyp = item.Data.Metadaten['Bundes-Landesnormen'].Typ;
                 }

                 return (
                   <div key={itemNr} className="resultBox">
                     <div className="itemNrDIV">#{itemNr}</div>
                     <h4 className="bottomLine">
                       
                       {bundesnormTyp}
                     </h4>
                     <p className="resultInfoText">
                       {item.Data.Metadaten['Bundes-Landesnormen'].ArtikelParagraphAnlage}, {item.Data.Metadaten['Bundes-Landesnormen'].Kurztitel}
                     </p>
                     <p className="buttonAndLinksDIV bottomLine">
                       {createdDocumentUrls(item.Data.Dokumentliste)}
                       <a href={item.Data.Metadaten['Bundes-Landesnormen'].GesamteRechtsvorschriftUrl} target="_blank" key="123">
                          <img src="./icons/gesamt-icon.svg" className="urlLinkIcon" alt="Gesamte Rechtsvorschrift" title="Gesamte Rechtsvorschrift in neuem Fenster öffnen" />
                       </a>
                       &nbsp; <AddDocButton resultID={i} rechtsquelle='bundesrecht' />
                     </p>
                     <p className="resultSmallInfoText">
                       Inkrafttrete-Datum: {item.Data.Metadaten['Bundes-Landesnormen'].Inkrafttretedatum}
                       <span className="mySeparator"> &nbsp;|&nbsp; </span>
                       {item.Data.Metadaten['Bundes-Landesnormen'].Kundmachungsorgan}
                     </p>
                  </div>
                 );
               })}  
             </div>
             <div className="hCenterBrowseButtons">
               <div className="arrowLink">
                 <img src="./icons/back.svg" id="BrowseBackw-Bottom" onClick={this.handleBrowseResults} alt="" />
               </div>
               <div className="arrowLink">
                 <img src="./icons/forward.svg" id="BrowseForw-Bottom" onClick={this.handleBrowseResults} alt="" />
               </div>
             </div>
           </div>
      );
    } else {
         return (
           <div className="resultsDIV">
             <div className="resultsOverview">
               <h1>Bundesrecht</h1>
               <p>(konsolidiert)</p>
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