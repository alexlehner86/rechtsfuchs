import { config } from './config';

export const searchRIS_Service = {
    fetchBundesrecht,
    fetchLandesrecht,
    fetchVwGH,
    fetchVfGH
};

function fetchBundesrecht(searchQuery) {
    const myParams =  'Seitennummer='    + searchQuery.seitennummer
                       +'&Suchworte='      + searchQuery.suchworte
                       +'&Fassung.VonInkrafttretedatum=' + searchQuery.datumVon
                       +'&Fassung.BisInkrafttretedatum=' + searchQuery.datumBis
                       +'&Typ=' + searchQuery.bundesrechtTyp
                       +'&Sortierung.SortedByColumn=Inkrafttretedatum&Sortierung.SortDirection=Descending';

    const endpoint = `${config.RIS_apiURL}/Bundesnormen?${myParams}`;

    return fetch(endpoint).then(handleResponse);
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

function handleResponse(response) {
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

        return data;
    });
}