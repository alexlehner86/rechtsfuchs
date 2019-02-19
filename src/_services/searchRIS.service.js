import { config } from './config';
import { BundesrechtItem, LandesrechtItem, JustizItem,
         RISsearchResultItemGroup, RISweblinks } from '../_helpers';
import { searchRIS_Actions } from '../_actions';
import $ from 'jquery';

export const searchRIS_Service = {
    fetchBundesrecht,
    fetchLandesrecht,
    fetchJustiz,
    fetchVfGH,
    fetchVwGH
};

function fetchBundesrecht(searchQuery) {
    const myParams = 'Seitennummer=' + searchQuery.pageNumber
                       + '&Suchworte=' + searchQuery.suchworte
                       + '&Abschnitt.Von=' + searchQuery.bundesrechtParagraphArtAnlNummer
                       + '&Abschnitt.Bis=' + searchQuery.bundesrechtParagraphArtAnlNummer
                       + '&Abschnitt.Typ=' + searchQuery.bundesrechtParagraphArtAnlTyp
                       + '&Fassung.VonInkrafttretedatum=' + searchQuery.datumVon
                       + '&Fassung.BisInkrafttretedatum=' + searchQuery.datumBis
                       + '&Typ=' + searchQuery.bundesrechtTyp
                       + '&Sortierung.SortedByColumn=Inkrafttretedatum&Sortierung.SortDirection=Descending';

    const endpoint = `${config.RIS_apiURL}/Bundesnormen?${myParams}`;

    return fetch(endpoint).then(response => handleResponse(response, createBundesrechtItemGroup));
}

function fetchLandesrecht(searchQuery) {
    const sucheinschraenkungNachBundesland = `&Bundesland.SucheIn${searchQuery.bundesland}=on`;
    if (searchQuery.bundesland === 'Wien') {
        searchQuery.landesrechtTyp = convertLandesrechtTypForVienna(searchQuery.landesrechtTyp);
    }
    const myParams =  'Seitennummer=' + searchQuery.pageNumber
                       + '&Suchworte=' + searchQuery.suchworte
                       + '&Abschnitt.Von=' + searchQuery.landesrechtParagraphArtAnlNummer
                       + '&Abschnitt.Bis=' + searchQuery.landesrechtParagraphArtAnlNummer
                       + '&Abschnitt.Typ=' + searchQuery.landesrechtParagraphArtAnlTyp
                       + '&Fassung.VonInkrafttretedatum=' + searchQuery.datumVon
                       + '&Fassung.BisInkrafttretedatum=' + searchQuery.datumBis
                       + '&Typ=' + searchQuery.landesrechtTyp
                       + sucheinschraenkungNachBundesland                       
                       + '&Sortierung.SortedByColumn=Inkrafttretedatum&Sortierung.SortDirection=Descending';
                       
    const endpoint = `${config.RIS_apiURL}/Landesnormen?${myParams}`;

    return fetch(endpoint).then(response => handleResponse(response, createLandesrechtItemGroup));
}

function convertLandesrechtTypForVienna(landesrechtTyp) {
    // if "Wien" is chosen, then the "landesrechtTyp" has to be adapted
    switch (landesrechtTyp) {
        case 'LG':
            return 'Landesgesetz';
        case 'V':
            return 'Verordnung';
        case 'K':
            return 'Kundmachung';
        default:
            return landesrechtTyp;
    }    
}

function fetchJustiz(searchQuery) {
    let searchDokumenttyp = '';
    switch (searchQuery.justizDokumenttyp) {
      case 'Rechtssatz':
        searchDokumenttyp = '&Dokumenttyp.SucheInRechtssaetzen=on';
        break;
      case 'Entscheidungstext':
        searchDokumenttyp = '&Dokumenttyp.SucheInEntscheidungstexten=on';
        break;
      default:
        searchDokumenttyp = '';
    }
  
    const myParams =  'Seitennummer='    + searchQuery.pageNumber
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Geschaeftszahl=' + searchQuery.justizGeschaeftszahl
                       +'&Gericht=' + searchQuery.justizGerichtstyp
                       +searchDokumenttyp;
    const endpoint = `${config.RIS_apiURL}/Judikatur?Applikation=Justiz&${myParams}`;

    return fetch(endpoint).then(response => handleResponse(response, createJustizItemGroup));
}

function fetchVfGH(searchQuery) {
    let searchDokumenttyp = '';
    switch (searchQuery.vfghDokumenttyp) {
      case 'Rechtssatz':
        searchDokumenttyp = '&Dokumenttyp.SucheInRechtssaetzen=on';
        break;
      case 'Entscheidungstext':
        searchDokumenttyp = '&Dokumenttyp.SucheInEntscheidungstexten=on';
        break;
      default:
        searchDokumenttyp = '';
    }
  
    const myParams =  'Seitennummer='    + searchQuery.pageNumber
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Geschaeftszahl=' + searchQuery.vfghGeschaeftszahl
                       +'&Entscheidungsart=' + searchQuery.vfghEntscheidungsart
                       +'&EntscheidungsdatumVon=' + searchQuery.datumVon
                       +'&EntscheidungsdatumBis=' + searchQuery.datumBis
                       +searchDokumenttyp;
    const endpoint = `${config.RIS_apiURL}/Judikatur?Applikation=Vfgh&${myParams}`;

    return fetch(endpoint).then(response => handleResponse(response, createVfGHItemGroup));
}

function fetchVwGH(searchQuery) {
    let searchDokumenttyp = '';
    switch (searchQuery.vwghDokumenttyp) {
      case 'Rechtssatz':
        searchDokumenttyp = '&Dokumenttyp.SucheInRechtssaetzen=on';
        break;
      case 'Entscheidungstext':
        searchDokumenttyp = '&Dokumenttyp.SucheInEntscheidungstexten=on';
        break;
      default:
        searchDokumenttyp = '';
    }
  
    const myParams =  'Seitennummer='    + searchQuery.pageNumber
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Geschaeftszahl=' + searchQuery.vwghGeschaeftszahl
                       +'&Entscheidungsart=' + searchQuery.vwghEntscheidungsart
                       +'&EntscheidungsdatumVon=' + searchQuery.datumVon
                       +'&EntscheidungsdatumBis=' + searchQuery.datumBis
                       +searchDokumenttyp;
    const endpoint = `${config.RIS_apiURL}/Judikatur?Applikation=Vwgh&${myParams}`;

    return fetch(endpoint).then(response => handleResponse(response, createVwGHItemGroup));
}

function handleResponse(response, createResultItemGroup) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        //check for possible "Error" object in the response
        if (data.OgdSearchResult.Error) {
            const errMessage = data.OgdSearchResult.Error.Message;
            return Promise.reject(errMessage.slice(23,errMessage.length));
        }
        
        if (createResultItemGroup) return createResultItemGroup(data);
        else return data;
    });
}

function createBundesrechtItemGroup(results) {
    const title = "Bundesrecht";
    const resultsMetaInfo = getResultsMetaInfo(results);
    let resultsArray = [];
    const reduxActions = {
        fetchSearchResults: searchRIS_Actions.fetchBundesrecht
    };

    if (resultsMetaInfo.totalNumberOfHits > 0) {
        let resultItemsFromRIS = results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
        if (!$.isArray(resultItemsFromRIS)) {
            resultItemsFromRIS = [ resultItemsFromRIS ];
        }
        resultItemsFromRIS.forEach(item => {
            let weblinks = getDocumentUrls(item.Data.Dokumentliste);
            weblinks.gesamt_url = item.Data.Metadaten['Bundes-Landesnormen'].GesamteRechtsvorschriftUrl;

            resultsArray.push(
                new BundesrechtItem(getBundesnormTyp(item.Data.Metadaten['Bundes-Landesnormen'].Typ),
                                    item.Data.Metadaten['Bundes-Landesnormen'].ArtikelParagraphAnlage,
                                    item.Data.Metadaten['Bundes-Landesnormen'].Kurztitel,
                                    item.Data.Metadaten['Bundes-Landesnormen'].Inkrafttretedatum,
                                    item.Data.Metadaten['Bundes-Landesnormen'].Kundmachungsorgan,
                                    weblinks)
            );
        });
    }

    return new RISsearchResultItemGroup(title, resultsMetaInfo, resultsArray, reduxActions);
}

function createLandesrechtItemGroup(results) {
    const title = "Landesrecht";
    const resultsMetaInfo = getResultsMetaInfo(results);
    let resultsArray = [];
    const reduxActions = {
        fetchSearchResults: searchRIS_Actions.fetchLandesrecht
    };

    if (resultsMetaInfo.totalNumberOfHits > 0) {
        let resultItemsFromRIS = results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
        if (!$.isArray(resultItemsFromRIS)) {
            resultItemsFromRIS = [ resultItemsFromRIS ];
        }
        resultItemsFromRIS.forEach(item => {
            let weblinks = getDocumentUrls(item.Data.Dokumentliste);
            weblinks.gesamt_url = item.Data.Metadaten['Bundes-Landesnormen'].GesamteRechtsvorschriftUrl;

            resultsArray.push(
                new LandesrechtItem(item.Data.Metadaten['Bundes-Landesnormen'].Bundesland,
                                    getLandesnormTyp(item.Data.Metadaten['Bundes-Landesnormen'].Typ),
                                    item.Data.Metadaten['Bundes-Landesnormen'].ArtikelParagraphAnlage,
                                    item.Data.Metadaten['Bundes-Landesnormen'].Kurztitel,
                                    item.Data.Metadaten['Bundes-Landesnormen'].Inkrafttretedatum,
                                    item.Data.Metadaten['Bundes-Landesnormen'].Kundmachungsorgan,
                                    weblinks)
            );
        });
    }

    return new RISsearchResultItemGroup(title, resultsMetaInfo, resultsArray, reduxActions);
}
function createJustizItemGroup(results) {
    const title = "Justiz (OGH, OLG, etc.)";
    const resultsMetaInfo = getResultsMetaInfo(results);
    let resultsArray = [];
    const reduxActions = {
        fetchSearchResults: searchRIS_Actions.fetchJustiz
    };

    if (resultsMetaInfo.totalNumberOfHits > 0) {
        let resultItemsFromRIS = results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
        if (!$.isArray(resultItemsFromRIS)) {
            resultItemsFromRIS = [ resultItemsFromRIS ];
        }
        resultItemsFromRIS.forEach(item => {
            let geschaeftszahl = getGeschaeftszahl(item);
            let weblinks = getDocumentUrls(item.Data.Dokumentliste);
            let schlagworte = item.Data.Metadaten['Judikatur'].Schlagworte;
            if (schlagworte === undefined) schlagworte = 'Kein Beschreibungstext vorhanden';

            resultsArray.push(
                new JustizItem(title,
                                item.Data.Metadaten['Judikatur'].Justiz.Gericht,
                                item.Data.Metadaten['Judikatur'].Dokumenttyp, schlagworte,
                                item.Data.Metadaten['Judikatur'].Entscheidungsdatum,
                                geschaeftszahl, weblinks)
            );
        });
    }

    return new RISsearchResultItemGroup(title, resultsMetaInfo, resultsArray, reduxActions);
}

function createVfGHItemGroup(results) {
    const title = "Verfassungsgerichtshof";
    const resultsMetaInfo = getResultsMetaInfo(results);
    let resultsArray = [];
    const reduxActions = {
        fetchSearchResults: searchRIS_Actions.fetchVfGH
    };

    if (resultsMetaInfo.totalNumberOfHits > 0) {
        let resultItemsFromRIS = results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
        if (!$.isArray(resultItemsFromRIS)) {
            resultItemsFromRIS = [ resultItemsFromRIS ];
        }
        resultItemsFromRIS.forEach(item => {
            let geschaeftszahl = getGeschaeftszahl(item);
            let weblinks = getDocumentUrls(item.Data.Dokumentliste);
            let schlagworte = item.Data.Metadaten['Judikatur'].Schlagworte;
            if (schlagworte === undefined) schlagworte = 'Kein Beschreibungstext vorhanden';

            resultsArray.push(
                new JustizItem(title,
                                 item.Data.Metadaten['Judikatur'].Vfgh.Entscheidungsart,
                                 item.Data.Metadaten['Judikatur'].Dokumenttyp, schlagworte,
                                 item.Data.Metadaten['Judikatur'].Entscheidungsdatum,
                                 geschaeftszahl, weblinks)
            );
        });
    }

    return new RISsearchResultItemGroup(title, resultsMetaInfo, resultsArray, reduxActions);
}

function createVwGHItemGroup(results) {
    const title = "Verwaltungsgerichtshof";
    const resultsMetaInfo = getResultsMetaInfo(results);
    let resultsArray = [];
    const reduxActions = {
        fetchSearchResults: searchRIS_Actions.fetchVwGH
    };

    if (resultsMetaInfo.totalNumberOfHits > 0) {
        let resultItemsFromRIS = results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
        if (!$.isArray(resultItemsFromRIS)) {
            resultItemsFromRIS = [ resultItemsFromRIS ];
        }
        resultItemsFromRIS.forEach(item => {
            let geschaeftszahl = getGeschaeftszahl(item);
            let weblinks = getDocumentUrls(item.Data.Dokumentliste);
            let schlagworte = item.Data.Metadaten['Judikatur'].Schlagworte;
            if (schlagworte === undefined) schlagworte = 'Kein Beschreibungstext vorhanden';

            resultsArray.push(
                new JustizItem(title,
                                 item.Data.Metadaten['Judikatur'].Vwgh.Entscheidungsart,
                                 item.Data.Metadaten['Judikatur'].Dokumenttyp, schlagworte,
                                 item.Data.Metadaten['Judikatur'].Entscheidungsdatum,
                                 geschaeftszahl, weblinks)
            );
        });
    }

    return new RISsearchResultItemGroup(title, resultsMetaInfo, resultsArray, reduxActions);
}

function getGeschaeftszahl(item) {
    if ($.isArray(item.Data.Metadaten['Judikatur'].Geschaeftszahl.item)) {
        return item.Data.Metadaten['Judikatur'].Geschaeftszahl.item[item.Data.Metadaten['Judikatur'].Geschaeftszahl.item.length - 1];
    } else {
        return item.Data.Metadaten['Judikatur'].Geschaeftszahl.item;
    }
}

function getResultsMetaInfo(results) {
    let resultsMetaInfo = {
        pageNumber: 0,
        totalNumberOfPages: 0,
        totalNumberOfHits: results.OgdSearchResult.OgdDocumentResults.Hits['#text']
    }
    if (resultsMetaInfo.totalNumberOfHits > 0) {
        resultsMetaInfo.pageNumber = results.OgdSearchResult.OgdDocumentResults.Hits['@pageNumber'];
        const pagesize = results.OgdSearchResult.OgdDocumentResults.Hits['@pageSize'];
        resultsMetaInfo.totalNumberOfPages = Math.floor(resultsMetaInfo.totalNumberOfHits / pagesize);
        if (resultsMetaInfo.totalNumberOfHits % pagesize) resultsMetaInfo.totalNumberOfPages++;
    }
    return resultsMetaInfo;
}

function getBundesnormTyp(bundesnormTyp) {
    switch (bundesnormTyp) {
     case 'BVG':
       return 'Bundesverfassungsgesetz';
     case 'BG':
       return 'Bundesgesetz';
     case 'V':
       return 'Verordnung';
     case 'K':
       return 'Kundmachung';
     default:
       return bundesnormTyp;
    }
}

function getLandesnormTyp(landesnormTyp) {
    switch (landesnormTyp) {
     case 'LVG':
       return 'Landesverfassungsgesetz';
     case 'LG':
       return 'Landesgesetz';
     case 'V':
       return 'Verordnung';
     case 'K':
       return 'Kundmachung';
     default:
       return landesnormTyp;
    }
}

function getDocumentUrls(dokumentliste) {
    var links = {};
    if (dokumentliste && $.isArray(dokumentliste.ContentReference)) {
        for (var i = 0, l = dokumentliste.ContentReference.length; i < l; i++) {
            var o = dokumentliste.ContentReference[i];
            if  (o.ContentType === "MainDocument") {
                links = buildDocumentUrlsObject(o.Urls.ContentUrl);
                break;
            }
        }
    } else {
        links = buildDocumentUrlsObject(dokumentliste.ContentReference.Urls.ContentUrl);
    }
    return links;
}

//create links to external documents (PDF, DOC and webpage)
function buildDocumentUrlsObject(contentUrls) {
    
    let links = new RISweblinks();
    if (!$.isArray(contentUrls))
        contentUrls = [ contentUrls ];

    for (let x = 0; x < contentUrls.length; x++) {
          if (contentUrls[x].DataType === 'Pdf') {
            links.pdf_url = contentUrls[x].Url;
          } else if (contentUrls[x].DataType === 'Html') {
            links.web_url = contentUrls[x].Url; 
          } else if (contentUrls[x].DataType === 'Docx' || contentUrls[x].DataType === 'Rtf') {
            links.doc_url = contentUrls[x].Url;
          }
    }
    
    return links;
}