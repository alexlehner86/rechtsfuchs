import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActionsProjectMgmt, projectActions } from '../_actions';
import { LoadingProjectsInProgressPage, NoProjectsStoredPage, ProjectManagementButtons, 
         ProjectsAsListGroup, SortProjectListButtons } from './components';
import { climbUpDOMtreeUntilElementOfType } from '../_helpers';
import './ProjectsList.css';

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.handleButton = this.handleButton.bind(this);
    this.handleSortLogicChange = this.handleSortLogicChange.bind(this);
  }

  render() {
    const { loadingProjects, listOfRIS_Projects, selectedSortLogic, projectIsSelected, selectedProjectID } = this.props;

    if (loadingProjects || !listOfRIS_Projects) {
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
          <SortProjectListButtons selectedSortLogic={selectedSortLogic} handleSortLogicChange={this.handleSortLogicChange} />
          <ProjectsAsListGroup projects={listOfRIS_Projects.projects} selectedProjectID={selectedProjectID} />
        </div>
      )
    }
  }

  handleButton(e) {
    const { dispatch } = this.props;
    const event = e || window.event;
    let eventTarget = event.target || event.srcElement;
    eventTarget = climbUpDOMtreeUntilElementOfType(eventTarget, 'BUTTON');

    // pass id ('CreateProject', 'EditProject' or 'DeleteProject') to Redux-Store to show corresponding page
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange(eventTarget.id));
  }

  handleSortLogicChange(e) {
    const { dispatch } = this.props;
    const event = e || window.event;
    let eventTarget = event.target || event.srcElement;

    // pass id ('alphabetically' or 'chronologically') to Redux-Store to sort listOfRIS_Projects
    dispatch(projectActions.setSortLogic(eventTarget.id));
  }
}

function mapStateToProps(state) {
  const { loadingProjects, listOfRIS_Projects, selectedSortLogic, projectIsSelected, selectedProjectID, editingProject } = state.projects;
  return {
    loadingProjects,
    listOfRIS_Projects,
    selectedSortLogic,
    projectIsSelected,
    selectedProjectID,
    editingProject
  };
}

const connectedProjectsList = connect(mapStateToProps)(ProjectsList);
export { connectedProjectsList as ProjectsList };