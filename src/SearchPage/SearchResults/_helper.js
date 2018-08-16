import React from 'react';
import $ from 'jquery';

export {
    getMetaInfo,
    createdDocumentUrls
}

function getMetaInfo(searchResults) {
    let metaInfo = {};
    metaInfo.aktSeitennummer = searchResults.OgdSearchResult.OgdDocumentResults.Hits['@pageNumber'];
    metaInfo.anzTreffer = searchResults.OgdSearchResult.OgdDocumentResults.Hits['#text'];
    const pagesize = searchResults.OgdSearchResult.OgdDocumentResults.Hits['@pageSize'];
    metaInfo.maxSeiten =  Math.floor(metaInfo.anzTreffer / pagesize);
    if (metaInfo.anzTreffer % pagesize) {
      metaInfo.maxSeiten++;
    }
    return metaInfo;
  }


//Links zu Rechtsdokumenten (PDF, DOC und Webpage) erzeugen

function buildDocumentUrls(ContentUrl) {
    
    let links = [];
    if ($.isArray(ContentUrl)) { 
        for (let x = 0; x < ContentUrl.length; x++) {
          if (ContentUrl[x].DataType === 'Pdf') {
            links.push(
                <a href={ContentUrl[x].Url} target="_blank" key={x}>
                  <img src="./icons/pdf-icon.svg" className="urlLinkIcon" alt="PDF-Dokument" title="PDF-Dokument in neuem Fenster öffnen" />
                </a>
              );   
          } else if (ContentUrl[x].DataType === 'Html') {
            links.push(
                <a href={ContentUrl[x].Url} target="_blank" key={x}>
                  <img src="./icons/web-icon.svg" className="urlLinkIcon" alt="HTML-Dokument" title="HTML-Dokument in neuem Fenster öffnen" />
                </a>
            );   
          } else if (ContentUrl[x].DataType === 'Docx' || ContentUrl[x].DataType === 'Rtf') {
            links.push(
                <a href={ContentUrl[x].Url} target="_blank" key={x}>
                  <img src="./icons/doc-icon.svg" className="urlLinkIcon" alt="WORD-Dokument" title="WORD-Dokument in neuem Fenster öffnen" />
                </a>
            );  
          }
        }
    } else {
      if (ContentUrl.DataType === 'Pdf') {
            links.push(
                <a href={ContentUrl.Url} target="_blank" key="123">
                  <img src="./icons/pdf-icon.svg" className="urlLinkIcon" alt="PDF-Dokument" title="PDF-Dokument in neuem Fenster öffnen" />
                </a>
              );          
      } else if (ContentUrl.DataType === 'Html') {
            links.push(
                <a href={ContentUrl.Url} target="_blank" key="123">
                  <img src="./icons/web-icon.svg" className="urlLinkIcon" alt="HTML-Dokument" title="HTML-Dokument in neuem Fenster öffnen" />
                </a>
            );   
      } else if (ContentUrl.DataType === 'Docx' || ContentUrl.DataType === 'Rtf') {
            links.push(
                <a href={ContentUrl.Url} target="_blank" key="123">
                  <img src="./icons/doc-icon.svg" className="urlLinkIcon" alt="WORD-Dokument" title="WORD-Dokument in neuem Fenster öffnen" />
                </a>
            );  
      }
    }
 
    return <span>{links}</span>;
}

function createdDocumentUrls(Dokumentliste) {
    var links = "";
    if (Dokumentliste && $.isArray(Dokumentliste.ContentReference)) {
        for (var i = 0, l = Dokumentliste.ContentReference.length; i < l; i++) {
            var o = Dokumentliste.ContentReference[i];
            if  (o.ContentType === "MainDocument") {
                links = buildDocumentUrls(o.Urls.ContentUrl);
                break;
            }
        }
    } else {
        links = buildDocumentUrls(Dokumentliste.ContentReference.Urls.ContentUrl);
    }
    return links;
}