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
    const myParams =  'Seitennummer='    + searchQuery.pageNumber
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Geschaeftszahl=' + searchQuery.justizGeschaeftszahl
                       +'&Gericht=' + searchQuery.justizGerichtstyp
                       +'&EntscheidungsdatumVon=' + searchQuery.datumVon
                       +'&EntscheidungsdatumBis=' + searchQuery.datumBis
                       +getDokumenttypSearchString(searchQuery.justizDokumenttyp);
    const endpoint = `${config.RIS_apiURL}/Judikatur?Applikation=Justiz&${myParams}`;

    return fetch(endpoint).then(response => handleResponse(response, createJustizItemGroup));
}

function fetchVfGH(searchQuery) {
    const myParams =  'Seitennummer='    + searchQuery.pageNumber
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Geschaeftszahl=' + searchQuery.vfghGeschaeftszahl
                       +'&Entscheidungsart=' + searchQuery.vfghEntscheidungsart
                       +'&EntscheidungsdatumVon=' + searchQuery.datumVon
                       +'&EntscheidungsdatumBis=' + searchQuery.datumBis
                       +getDokumenttypSearchString(searchQuery.vfghDokumenttyp);
    const endpoint = `${config.RIS_apiURL}/Judikatur?Applikation=Vfgh&${myParams}`;

    return fetch(endpoint).then(response => handleResponse(response, createVfGHItemGroup));
}

function fetchVwGH(searchQuery) {
    const myParams =  'Seitennummer='    + searchQuery.pageNumber
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Geschaeftszahl=' + searchQuery.vwghGeschaeftszahl
                       +'&Entscheidungsart=' + searchQuery.vwghEntscheidungsart
                       +'&EntscheidungsdatumVon=' + searchQuery.datumVon
                       +'&EntscheidungsdatumBis=' + searchQuery.datumBis
                       +getDokumenttypSearchString(searchQuery.vwghDokumenttyp);
    const endpoint = `${config.RIS_apiURL}/Judikatur?Applikation=Vwgh&${myParams}`;

    return fetch(endpoint).then(response => handleResponse(response, createVwGHItemGroup));
}

function getDokumenttypSearchString(dokumenttyp) {
    switch (dokumenttyp) {
        case 'Rechtssatz':
          return '&Dokumenttyp.SucheInRechtssaetzen=on';
        case 'Entscheidungstext':
          return '&Dokumenttyp.SucheInEntscheidungstexten=on';
        default:
          return '';
    }
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
    return createItemGroup(results, searchRIS_Actions.fetchBundesrecht, createBundesrechtItem);
}

function createLandesrechtItemGroup(results) {
    return createItemGroup(results, searchRIS_Actions.fetchLandesrecht, createLandesrechtItem);
}

function createJustizItemGroup(results) {
    return createItemGroup(results, searchRIS_Actions.fetchJustiz, createJustizItem);
}

function createVfGHItemGroup(results) {
    return createItemGroup(results, searchRIS_Actions.fetchVfGH, createVfghItem);
}

function createVwGHItemGroup(results) {
    return createItemGroup(results, searchRIS_Actions.fetchVwGH, createVwghItem);
}

function createItemGroup(results, fetchFunction, createSearchResultItem) {
    const resultsMetaInfo = getResultsMetaInfo(results);
    let resultsArray = [];
    const reduxActions = {
        fetchSearchResults: fetchFunction
    };

    if (resultsMetaInfo.totalNumberOfHits > 0) {
        let resultItemsFromRIS = results.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
        if (!$.isArray(resultItemsFromRIS)) {
            resultItemsFromRIS = [ resultItemsFromRIS ];
        }
        resultItemsFromRIS.forEach(item => resultsArray.push(createSearchResultItem(item)));
    }

    return new RISsearchResultItemGroup(resultsMetaInfo, resultsArray, reduxActions);
}

function createBundesrechtItem(searchResultItem) {
    return new BundesrechtItem(getBundesnormTyp(searchResultItem.Data.Metadaten['Bundes-Landesnormen'].Typ),
        searchResultItem.Data.Metadaten['Bundes-Landesnormen'].ArtikelParagraphAnlage,
        searchResultItem.Data.Metadaten['Bundes-Landesnormen'].Kurztitel,
        searchResultItem.Data.Metadaten['Bundes-Landesnormen'].Inkrafttretedatum,
        searchResultItem.Data.Metadaten['Bundes-Landesnormen'].Kundmachungsorgan,
        getDocumentUrls(searchResultItem, true)
    );
}

function createLandesrechtItem(searchResultItem) {
    return new LandesrechtItem(searchResultItem.Data.Metadaten['Bundes-Landesnormen'].Bundesland,
        getLandesnormTyp(searchResultItem.Data.Metadaten['Bundes-Landesnormen'].Typ),
        searchResultItem.Data.Metadaten['Bundes-Landesnormen'].ArtikelParagraphAnlage,
        searchResultItem.Data.Metadaten['Bundes-Landesnormen'].Kurztitel,
        searchResultItem.Data.Metadaten['Bundes-Landesnormen'].Inkrafttretedatum,
        searchResultItem.Data.Metadaten['Bundes-Landesnormen'].Kundmachungsorgan,
        getDocumentUrls(searchResultItem, true)
    );
}

function createJustizItem(searchResultItem) {
    let schlagworte = searchResultItem.Data.Metadaten['Judikatur'].Schlagworte;
    if (schlagworte === undefined) schlagworte = 'Kein Beschreibungstext vorhanden';
    return new JustizItem('Justiz',
        searchResultItem.Data.Metadaten['Judikatur'].Justiz.Gericht,
        searchResultItem.Data.Metadaten['Judikatur'].Dokumenttyp,
        schlagworte,
        searchResultItem.Data.Metadaten['Judikatur'].Entscheidungsdatum,
        getGeschaeftszahl(searchResultItem),
        getDocumentUrls(searchResultItem)
    );
}

function createVfghItem(searchResultItem) {
    let schlagworte = searchResultItem.Data.Metadaten['Judikatur'].Schlagworte;
    if (schlagworte === undefined) schlagworte = 'Kein Beschreibungstext vorhanden';
    return new JustizItem('Verfassungsgerichtshof',
        searchResultItem.Data.Metadaten['Judikatur'].Vfgh.Entscheidungsart,
        searchResultItem.Data.Metadaten['Judikatur'].Dokumenttyp,
        schlagworte,
        searchResultItem.Data.Metadaten['Judikatur'].Entscheidungsdatum,
        getGeschaeftszahl(searchResultItem),
        getDocumentUrls(searchResultItem)
    );
}

function createVwghItem(searchResultItem) {
    let schlagworte = searchResultItem.Data.Metadaten['Judikatur'].Schlagworte;
    if (schlagworte === undefined) schlagworte = 'Kein Beschreibungstext vorhanden';
    return new JustizItem('Verwaltungsgerichtshof',
        searchResultItem.Data.Metadaten['Judikatur'].Vwgh.Entscheidungsart,
        searchResultItem.Data.Metadaten['Judikatur'].Dokumenttyp,
        schlagworte,
        searchResultItem.Data.Metadaten['Judikatur'].Entscheidungsdatum,
        getGeschaeftszahl(searchResultItem),
        getDocumentUrls(searchResultItem)
    );
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

function getDocumentUrls(searchResultItem, includesGesamtUrl = false) {
    let links = {};
    const documentList = searchResultItem.Data.Dokumentliste;
    if (documentList && $.isArray(documentList.ContentReference)) {
        for (var i = 0, l = documentList.ContentReference.length; i < l; i++) {
            var o = documentList.ContentReference[i];
            if  (o.ContentType === "MainDocument") {
                links = buildDocumentUrlsObject(o.Urls.ContentUrl);
                break;
            }
        }
    } else {
        links = buildDocumentUrlsObject(documentList.ContentReference.Urls.ContentUrl);
    }
    if (includesGesamtUrl) {
        links.gesamt_url = searchResultItem.Data.Metadaten['Bundes-Landesnormen'].GesamteRechtsvorschriftUrl;
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