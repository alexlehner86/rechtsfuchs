import { config } from './config';
import { BundesrechtItem, RISsearchResultItemGroup, RISweblinks } from '../_helpers';
import $ from 'jquery';

export const searchRIS_Service = {
    fetchBundesrecht,
    fetchLandesrecht,
    fetchVwGH,
    fetchVfGH
};

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
     case 'Vertrag':
       return 'Bundesgesetz';
     default:
       return bundesnormTyp;
    }
}

function createBundesrechtItemGroup(results) {
    const title = "Bundesrecht";
    let pageNumber = 0;
    let totalNumberOfPages = 0;
    const totalNumberOfHits = results.OgdSearchResult.OgdDocumentResults.Hits['#text'];
    let resultsArray = [];

    if (totalNumberOfHits > 0) {
        pageNumber = results.OgdSearchResult.OgdDocumentResults.Hits['@pageNumber'];
        const pagesize = results.OgdSearchResult.OgdDocumentResults.Hits['@pageSize'];
        totalNumberOfPages = Math.floor(totalNumberOfHits / pagesize);
        if (totalNumberOfHits % pagesize) totalNumberOfPages++;

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

    return new RISsearchResultItemGroup(title, pageNumber, totalNumberOfPages,
                                        totalNumberOfHits, resultsArray);
}

function fetchBundesrecht(searchQuery) {
    const myParams =  'Seitennummer='    + searchQuery.seitennummer
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Fassung.VonInkrafttretedatum=' + searchQuery.datumVon
                       +'&Fassung.BisInkrafttretedatum=' + searchQuery.datumBis
                       +'&Typ=' + searchQuery.bundesrechtTyp
                       +'&Sortierung.SortedByColumn=Inkrafttretedatum&Sortierung.SortDirection=Descending';

    const endpoint = `${config.RIS_apiURL}/Bundesnormen?${myParams}`;

    return fetch(endpoint).then(response => handleResponse(response, createBundesrechtItemGroup));
}

function fetchLandesrecht(searchQuery) {
    const sucheinschraenkungNachBundesland = `&Bundesland.SucheIn${searchQuery.bundesland}=on`;
    const myParams =  'Seitennummer='    + searchQuery.seitennummer
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Fassung.VonInkrafttretedatum=' + searchQuery.datumVon
                       +'&Fassung.BisInkrafttretedatum=' + searchQuery.datumBis
                       +'&Typ=' + searchQuery.landesrechtTyp
                       + sucheinschraenkungNachBundesland                       
                       +'&Sortierung.SortedByColumn=Inkrafttretedatum&Sortierung.SortDirection=Descending';
                       
    const endpoint = `${config.RIS_apiURL}/Landesnormen?${myParams}`;

    return fetch(endpoint).then(handleResponse);
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
  
    const myParams =  'Seitennummer='    + searchQuery.seitennummer
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Geschaeftszahl=' + searchQuery.vwghGeschaeftszahl
                       +'&Entscheidungsart=' + searchQuery.vwghEntscheidungsart
                       +'&EntscheidungsdatumVon=' + searchQuery.datumVon
                       +'&EntscheidungsdatumBis=' + searchQuery.datumBis
                       +searchDokumenttyp;
    const endpoint = `${config.RIS_apiURL}/Judikatur?Applikation=Vwgh&${myParams}`;

    return fetch(endpoint).then(handleResponse);
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
  
    const myParams =  'Seitennummer='    + searchQuery.seitennummer
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Geschaeftszahl=' + searchQuery.vfghGeschaeftszahl
                       +'&Entscheidungsart=' + searchQuery.vfghEntscheidungsart
                       +'&EntscheidungsdatumVon=' + searchQuery.datumVon
                       +'&EntscheidungsdatumBis=' + searchQuery.datumBis
                       +searchDokumenttyp;
    const endpoint = `${config.RIS_apiURL}/Judikatur?Applikation=Vfgh&${myParams}`;

    return fetch(endpoint).then(handleResponse);
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