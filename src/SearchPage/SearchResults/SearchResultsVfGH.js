import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRIS_Actions } from '../../_actions';
import { getMetaInfo, createdDocumentUrls } from './_helper';
import { AddDocButton } from './AddDocButton';
import $ from 'jquery';

////////////////////////////////////
// Component: VfGH-Suchresultate //
//////////////////////////////////
  
class SearchResultsVfGH extends Component {
    constructor(props) {
      super(props);
      
      this.handleBrowseResults = this.handleBrowseResults.bind(this);
    }
    
    handleBrowseResults(e) {
      const { dispatch } = this.props;
      const { searchQuery, results } = this.props.searchRIS_VfGH;
      const metaInfo = getMetaInfo(results);
      let newSearchQuery =  JSON.parse(JSON.stringify(searchQuery));
      
      //Browse Backward Klick (Pfeil nach links)
      if (e.target.id === 'BrowseBackw') {
        if ((metaInfo.aktSeitennummer - 1) >= 1) {
          //Daten von RIS-VfGH abrufen und im Redux-Store speichern
          newSearchQuery.seitennummer--;
          dispatch(searchRIS_Actions.fetchVfGH(newSearchQuery, true));
        }
      //Browse Forward Klick (Pfeil nach rechts)    
      } else if (metaInfo.aktSeitennummer < metaInfo.maxSeiten) {
          //Daten von RIS-VfGH abrufen und im Redux-Store speichern
          newSearchQuery.seitennummer++;  
          dispatch(searchRIS_Actions.fetchVfGH(newSearchQuery, true));
      }
    }
    
    render() {
      const { fetchingData, results } = this.props.searchRIS_VfGH;
  
      if (fetchingData) {
        return (
          <div className="resultsDIV">
            <div className="resultsOverview">
              <h1>Verfassungsgerichtshof</h1>
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
             <div className="resultsDIV">
               <div className="resultsOverview">
                 <h1>Verfassungsgerichtshof</h1>
                 <p>(Seite {metaInfo.aktSeitennummer} von {metaInfo.maxSeiten}, Anzahl Treffer: {metaInfo.anzTreffer})</p>
                 <a id="BrowseBackw" className="arrowLink" onClick={this.handleBrowseResults}>&lt;</a>&nbsp;
                 <a id="BrowseForw" className="arrowLink" onClick={this.handleBrowseResults}>&gt;</a>
               </div>
               <div className="resultsGrid">
                 {resultItems.map(function(item, i){
                   let itemNr = (metaInfo.aktSeitennummer - 1) * 20 + i + 1;
                   let geschaeftszahl = "";
                   if ($.isArray(item.Data.Metadaten['Judikatur'].Geschaeftszahl.item)) {
                     geschaeftszahl = item.Data.Metadaten['Judikatur'].Geschaeftszahl.item[item.Data.Metadaten['Judikatur'].Geschaeftszahl.item.length - 1];
                   } else {
                     geschaeftszahl = item.Data.Metadaten['Judikatur'].Geschaeftszahl.item;
                   }

                   return (
                   <div key={itemNr} className="resultBox">
                    <div className="itemNrDIV">#{itemNr}</div>
                    <h4 className="bottomLine">{item.Data.Metadaten['Judikatur'].Vfgh.Entscheidungsart}</h4>
                    <p className="resultInfoText">
                      {item.Data.Metadaten['Judikatur'].Dokumenttyp}: {item.Data.Metadaten['Judikatur'].Schlagworte}
                    </p>
                    <p className="buttonAndLinksDIV bottomLine">
                      {createdDocumentUrls(item.Data.Dokumentliste)}
                      &nbsp; <AddDocButton resultID={i} rechtsquelle='vfgh' />
                    </p>
                    <p className="resultSmallInfoText">
                      Entscheidungsdatum: {item.Data.Metadaten['Judikatur'].Entscheidungsdatum}
                      <span className="mySeparator"> &nbsp;|&nbsp; </span>
                      Geschäftszahl: {geschaeftszahl}
                    </p>
                   </div>
                   );
                 })}
               </div>
             </div>
        );
      } else {
           return (
             <div className="resultsDIV">
               <div className="resultsOverview">
                 <h1>Verfassungsgerichtshof</h1>
               </div>
               <p className="resultsContent">Keine Suchergebnisse gefunden!</p>
             </div>
            ); 
      } 
     } else return null;
    }
  }

function mapStateToProps(state) {
    const { searchRIS_VfGH } = state;
    return {
      searchRIS_VfGH
    };
}
  
const connectedSearchResultsVfGH = connect(mapStateToProps)(SearchResultsVfGH);
export { connectedSearchResultsVfGH as SearchResultsVfGH };