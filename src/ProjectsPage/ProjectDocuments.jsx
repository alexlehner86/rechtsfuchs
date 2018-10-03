import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingDocumentsInProgressPage, NoDocumentsStoredPage, ProjectDocumentsGrid } from './components';
import '../SearchPage/SearchResults.css';

class ProjectDocuments extends Component {

  render() {
    const { projectDocuments, loadingDocs, listOfRIS_Projects, selectedProjectID } = this.props;
    const { projectTitle } = listOfRIS_Projects.getProjectById(selectedProjectID);

    if (loadingDocs) {
      return <LoadingDocumentsInProgressPage projectTitle={projectTitle} />;
    }
    else if (projectDocuments.length === 0) {
      return <NoDocumentsStoredPage projectTitle={projectTitle} />;
    }
    else return (
      <div className="resultsDIV">
        <div className="resultsOverview">
          <h2>Dokumente des Projekts "{projectTitle}"</h2>
        </div>
        <ProjectDocumentsGrid projectDocuments={projectDocuments} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { listOfRIS_Projects, selectedProjectID } = state.projects;
  const projectDocuments = state.projectDocs.items;
  const { loadingDocs } = state.projectDocs;
  return {
    listOfRIS_Projects,
    selectedProjectID,
    loadingDocs,
    projectDocuments
  };
}

const connectedProjectDocuments = connect(mapStateToProps)(ProjectDocuments);
export { connectedProjectDocuments as ProjectDocuments };