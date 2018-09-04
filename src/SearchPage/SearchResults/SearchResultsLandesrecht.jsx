import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRIS_Actions } from '../../_actions';
import { getMetaInfo, createdDocumentUrls } from './_helper';
import { AddDocButton } from './';
import $ from 'jquery';
 
///////////////////////////////////////////
// Component: Landesrecht-Suchresultate //
/////////////////////////////////////////
  
class SearchResultsLandesrecht extends Component {
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
    const { searchQuery, results } = this.props.searchRIS_Landesrecht;
    const metaInfo = getMetaInfo(results);
    let newSearchQuery =  JSON.parse(JSON.stringify(searchQuery));
      
    // browse backward click (leftside arrow)
    if (eveTarget.id === 'BrowseBackw' || eveTarget.id === 'BrowseBackw-Bottom') {
      if ((metaInfo.aktSeitennummer - 1) >= 1) {
        // fetch data from the ris api and save it to the redux store
        newSearchQuery.seitennummer--;
        dispatch(searchRIS_Actions.fetchLandesrecht(newSearchQuery, true));

        if (eveTarget.id === 'BrowseBackw-Bottom')
          //scroll to the top of the "SearchResultsLandesrecht" element
          document.getElementById('SearchResultsLandesrecht').scrollIntoView(true);
      }
    // browse forward click (rightside arrow)     
    } else if (metaInfo.aktSeitennummer < metaInfo.maxSeitenNr) {
      // fetch data from the ris api and save it to the redux store
      newSearchQuery.seitennummer++;  
      dispatch(searchRIS_Actions.fetchLandesrecht(newSearchQuery, true));

      if (eveTarget.id === 'BrowseForw-Bottom')
          //scroll to the top of the "SearchResultsLandesrecht" element
          document.getElementById('SearchResultsLandesrecht').scrollIntoView(true);
    }
  }
  
  render() {
    const { fetchingData, results } = this.props.searchRIS_Landesrecht;
  
    if (fetchingData) {
      return (
        <div className="resultsDIV">
          <div className="resultsOverview">
               <h1>Landesrecht</h1>
               <p>(konsolidiert)</p>
          </div>
          <p className="resultsContent"><img src="./icons/in-progress.gif" alt="In Progress" className="progressAnimation"/>&nbsp;Daten werden abgerufen...</p>
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
           <div id="SearchResultsLandesrecht" className="resultsDIV">
             <div className="resultsOverview">
               <h1>Landesrecht</h1><br />
               <p>(konsolidiert, Seite {metaInfo.aktSeitennummer} von {metaInfo.maxSeiten}, Anzahl Treffer: {metaInfo.anzTreffer})</p>
               <div id="BrowseBackw" className="arrowLink" onClick={this.handleBrowseResults}>
                 <img src="./icons/back.svg" alt="" />
               </div>
               <div id="BrowseForw" className="arrowLink" onClick={this.handleBrowseResults}>
                 <img src="./icons/forward.svg" alt="" />
               </div>
             </div>
             <div className="resultsGrid">
               {resultItems.map(function(item, i){
                 let itemNr = (metaInfo.aktSeitennummer - 1) * 20 + i + 1;
                 let landesnormTyp = '';
                 
                 switch (item.Data.Metadaten['Bundes-Landesnormen'].Typ) {
                  case 'LVG':
                    landesnormTyp = 'Landesverfassungsgesetz';
                    break;
                  case 'LG':
                    landesnormTyp = 'Landesgesetz';
                    break;
                  case 'V':
                    landesnormTyp = 'Verordnung';
                    break;
                  case 'K':
                    landesnormTyp = 'Kundmachung';
                    break;
                  default:
                    landesnormTyp = item.Data.Metadaten['Bundes-Landesnormen'].Typ;
                 }

                 return (
                 <div key={itemNr} className="resultBox">
                  <div className="itemNrDIV">#{itemNr}</div>
                  <h4 className="bottomLine">
                    {item.Data.Metadaten['Bundes-Landesnormen'].Bundesland}: {landesnormTyp}
                  </h4>
                  <p className="resultInfoText">
                    {item.Data.Metadaten['Bundes-Landesnormen'].ArtikelParagraphAnlage}, {item.Data.Metadaten['Bundes-Landesnormen'].Kurztitel}
                  </p>
                  <p className="buttonAndLinksDIV bottomLine">
                    {createdDocumentUrls(item.Data.Dokumentliste)}
                    <a href={item.Data.Metadaten['Bundes-Landesnormen'].GesamteRechtsvorschriftUrl} target="_blank" key="123">
                      <img src="./icons/gesamt-icon.svg" className="urlLinkIcon" alt="Gesamte Rechtsvorschrift" title="Gesamte Rechtsvorschrift in neuem Fenster öffnen" />
                    </a>
                    &nbsp; <AddDocButton resultID={i} rechtsquelle='landesrecht' />
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
               <h1>Landesrecht</h1>
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
  const { searchRIS_Landesrecht } = state;
  return {
    searchRIS_Landesrecht
  };
}

const connectedSearchResultsLandesrecht = connect(mapStateToProps)(SearchResultsLandesrecht);
export { connectedSearchResultsLandesrecht as SearchResultsLandesrecht };