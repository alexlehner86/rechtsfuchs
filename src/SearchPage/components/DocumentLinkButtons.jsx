import React, { Component } from 'react';

class DocumentLinkButtons extends Component {
  render() {
    const { weblinks } = this.props;

    return (
      <span>
        { weblinks.web_url && (
          <a href={weblinks.web_url} target="_blank" key="2">
              <img src="./icons/web-icon.svg" className="urlLinkIcon" alt="" title="HTML-Dokument in neuem Fenster öffnen" />
          </a>
        )}
        { weblinks.pdf_url && (
          <a href={weblinks.pdf_url} target="_blank" key="1">
              <img src="./icons/pdf-icon.svg" className="urlLinkIcon" alt="" title="PDF-Dokument in neuem Fenster öffnen" />
          </a>
        )}
        { weblinks.doc_url && (
          <a href={weblinks.doc_url} target="_blank" key="3">
              <img src="./icons/doc-icon.svg" className="urlLinkIcon" alt="" title="WORD-Dokument in neuem Fenster öffnen" />
          </a>
        )}
        { weblinks.gesamt_url && (
          <a href={weblinks.gesamt_url} target="_blank" key="4">
              <img src="./icons/gesamt-icon.svg" className="urlLinkIcon" alt="" title="Gesamte Rechtsvorschrift in neuem Fenster öffnen" />
          </a>
        )}
      </span>
    );
  }
}

export { DocumentLinkButtons };