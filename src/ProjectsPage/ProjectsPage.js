import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ProjectsList } from './ProjectsList';
import { ProjectDocuments } from './ProjectDocuments';
import './ProjectsPage.css';

class ProjectsPage extends Component {
  render() {
    const { loggedIn, selectedProject } = this.props;

    return (
      <div className="Projects-Grid">
      
        {/* display left-side element: list of the user's projects */}
        <div id="Projects-List" className="Projects-Left">
          <div className="pufferBox"></div>
          { loggedIn && <ProjectsList /> }
          { !loggedIn && (
            <div>
              <h2>Meine Projekte</h2>
              <p>Log dich ein, um deine Projekte zu verwalten!</p>
            </div>
          )}
        </div>

        {/* display right-side element: list of the selected project's documents */} 
        <div id="Documents-List" className="Projects-Right">
          <div className="pufferBox"></div>
          { (loggedIn && selectedProject) && <ProjectDocuments /> }
          { (!loggedIn || !selectedProject) && (
               <div className="logoDIV">
                <div className="logoCenteringDIV">
                 <img src="./logo.svg" alt="" className="logoCentered" />
                </div>
               </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  const { selectedProject } = state.projects;
  return {
      loggedIn,
      selectedProject
  };
}

const connectedProjectsPage = connect(mapStateToProps)(ProjectsPage);
export { connectedProjectsPage as ProjectsPage };