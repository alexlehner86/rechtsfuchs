// ---------------------------------------------------------------------------
//  The ProjectManagement component renders different overlays that allow the user
//  to create, edit and delete projects as well as create and delete documents
// ---------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateProject, CreateProjectDocument, DeleteProject,
         DeleteProjectDocument, EditProject } from './';

class ProjectManagement extends Component {

  render() {
   // the redux store object "alertProjectMgmt" serves to functions:
   // 1) its parameter "overlaytoDisplay" defines, which overlay (e.g. CreateProjectPage) to show
   // 2) it contains error messages that can result from project management operations
   const { alertProjectMgmt } = this.props;
   
   if (alertProjectMgmt.overlayToDisplay !== 'Clear')
     return (
          <div className="overlayContainer">
            <div className="overlayWhiteBox">
              {alertProjectMgmt.message &&
                <div className={`alert ${alertProjectMgmt.type}`}>{alertProjectMgmt.message}</div>
              }
              {alertProjectMgmt.overlayToDisplay === 'CreateProject' && <CreateProject />}
              {alertProjectMgmt.overlayToDisplay === 'EditProject' && <EditProject />}
              {alertProjectMgmt.overlayToDisplay === 'DeleteProject' && <DeleteProject />}
              {alertProjectMgmt.overlayToDisplay === 'CreateProjectDoc' && <CreateProjectDocument />}
              {alertProjectMgmt.overlayToDisplay === 'DeleteProjectDoc' && <DeleteProjectDocument />}
            </div>
          </div>
      );
    else return null;
  }
}

function mapStateToProps(state) {
  const { alertProjectMgmt } = state;
  return {
    alertProjectMgmt
  };
}

const connectedProjectManagement = connect(mapStateToProps)(ProjectManagement);
export { connectedProjectManagement as ProjectManagement }; 
