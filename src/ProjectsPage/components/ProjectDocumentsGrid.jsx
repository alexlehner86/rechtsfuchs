import React, { Component } from 'react';
import { DeleteDocumentButton } from './';
import { DocumentLinkButtons } from '../../SearchPage/components';

class ProjectDocumentsGrid extends Component {
  render() {
    return (
      <div className="resultsGrid">
        {this.props.projectDocuments.map(function(item, i){
          const weblinks = { web_url: item.web_url, pdf_url: item.pdf_url, doc_url: item.doc_url, gesamt_url: item.gesamt_url };

          return (
            <div key={i} className="resultBoxProjectsPage">
              <DeleteDocumentButton documentId={i} />
              <h4 className="bottomLine"><span className="setHighlightColor">{item.rechtsquelle}</span>
                                        <br />{item.headline}</h4>
              <p className="resultInfoText">{item.maintext}</p>
              <p className="buttonAndLinksDIV bottomLine">
                <DocumentLinkButtons weblinks={weblinks} />
              </p>
              <p className="resultSmallInfoText">{item.smallprint}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export { ProjectDocumentsGrid };