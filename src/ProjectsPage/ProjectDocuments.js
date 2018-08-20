import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteDocButton } from './DeleteDocButton';
import '../SearchPage/SearchResults/SearchResults.css';

class ProjectDocuments extends Component {

  render() {
    const { projectDocItems, loadingDocs, projectItems, selectedProjectID } = this.props;
    const currentProject = projectItems.find( project => project.id === selectedProjectID );

    if (!loadingDocs)
    return (
      <div>
        <h2>Dokumente des Projekts "{currentProject.projectTitle}"</h2>
        { /* Der Nutzer hat bereits Dokumente angelegt */ }
        { projectDocItems.length > 0 && (
          <div className="resultsGrid">
               {projectDocItems.map(function(item, i){
                 return (
                   <div key={i} className="resultBoxProjectsPage">
                     <DeleteDocButton documentId={i} />
                     <h4 className="bottomLine"><span className="setHighlightColor">{item.rechtsquelle}</span>
                                                <br />{item.headline}</h4>
                     <p className="resultInfoText">{item.maintext}</p>
                     <p className="buttonAndLinksDIV bottomLine">
                       { item.web_url && (
                          <a href={item.web_url} target="_blank">
                            <img src="./icons/web-icon.svg" className="urlLinkIcon" alt="HTML-Dokument" title="HTML-Dokument in neuem Fenster öffnen" />
                          </a>
                       )}
                       { item.pdf_url && (
                          <a href={item.pdf_url} target="_blank">
                            <img src="./icons/pdf-icon.svg" className="urlLinkIcon" alt="PDF-Dokument" title="PDF-Dokument in neuem Fenster öffnen" />
                          </a>
                       )}
                       { item.doc_url && (
                          <a href={item.doc_url} target="_blank">
                            <img src="./icons/doc-icon.svg" className="urlLinkIcon" alt="WORD-Dokument" title="WORD-Dokument in neuem Fenster öffnen" />
                          </a>
                       )}
                       { item.gesamt_url && (
                          <a href={item.gesamt_url} target="_blank">
                            <img src="./icons/gesamt-icon.svg" className="urlLinkIcon" alt="Gesamte Rechtsvorschrift" title="Gesamte Rechtsvorschrift in neuem Fenster öffnen" />
                          </a>
                       )}
                     </p>
                     <p className="resultSmallInfoText">{item.smallprint}</p>
                  </div>
                 );
               })}
          </div>
        )}
        { /* Der Nutzer hat noch keine Dokumente angelegt */ }
        { projectDocItems.length === 0 && (
          <p>Keine Dokumente vorhanden!</p>
        )}
      </div>
    );
    else return (
      <div>
        <h2>Dokumente des Projekts "{currentProject.projectTitle}"</h2>
        <p className="resultsContent"><img src="./icons/in-progress.gif" alt="In Progress" className="progressAnimation" />&nbsp;Daten werden abgerufen...</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const projectItems = state.projects.items;
  const { selectedProjectID } = state.projects;
  const projectDocItems = state.projectDocs.items;
  const { loadingDocs } = state.projectDocs;
  return {
    projectDocItems,
    projectItems,
    selectedProjectID,
    loadingDocs
  };
}

const connectedProjectDocuments = connect(mapStateToProps)(ProjectDocuments);
export { connectedProjectDocuments as ProjectDocuments };