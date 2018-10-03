import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActionsProjectMgmt } from '../_actions';
import { LoadingProjectsInProgressPage, NoProjectsStoredPage, ProjectManagementButtons, ProjectsAsListGroup } from './components';
import './ProjectsList.css';

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.handleButton = this.handleButton.bind(this);
  }

  render() {
    const { loadingProjects, listOfRIS_Projects, projectIsSelected, selectedProjectID } = this.props;

    if (loadingProjects) {
      return <LoadingProjectsInProgressPage />;
    }
    else if (listOfRIS_Projects.isEmpty()) {
      return <NoProjectsStoredPage handleAddProjectButton={this.handleButton} />;
    }
    else {
      return (
        <div className="projectListWrapper">
          <h2 className="posRelative">
            Meine Projekte
            <ProjectManagementButtons projectIsSelected={projectIsSelected} handleButton={this.handleButton} />
          </h2>
          <ProjectsAsListGroup projects={listOfRIS_Projects.projects} selectedProjectID={selectedProjectID} />
        </div>
      )
    }
  }

  handleButton(e) {
    const { dispatch } = this.props;
    const event = e || window.event;
    let eventTarget = event.target || event.srcElement;

    // if click-event was triggered by a child element of the button, climb up DOM to button that stores the correct id
    while (eventTarget.getAttribute('type') !== 'button') {
      eventTarget = eventTarget.parentElement;
    }

    // pass id ('CreateProject', 'EditProject' or 'DeleteProject') to Redux-Store to show corresponding page
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange(eventTarget.id));
  }
}

function mapStateToProps(state) {
  const { loadingProjects, listOfRIS_Projects, projectIsSelected, selectedProjectID, editingProject } = state.projects;
  return {
    loadingProjects,
    listOfRIS_Projects,
    projectIsSelected,
    selectedProjectID,
    editingProject
  };
}

const connectedProjectsList = connect(mapStateToProps)(ProjectsList);
export { connectedProjectsList as ProjectsList };