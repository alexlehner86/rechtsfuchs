// ---------------------------------------------------------------------------
//  The ProjectManagement component renders different overlays that allow the user
//  to create, edit and delete projects as well as create and delete documents
// ---------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateProject, CreateProjectDocument, DeleteProject,
         DeleteProjectDocument, EditProject } from './components';
import { ShowAlertMessage } from '../UserMgmt/components';

class ProjectManagement extends Component {

  render() {
   // the redux store object "alertProjectMgmt" serves two functions:
   // 1) its parameter "overlaytoDisplay" defines, which overlay component (e.g. CreateProject) to show
   // 2) it contains error messages that can result from project management operations
   const { type, message, overlayToDisplay } = this.props.alertProjectMgmt;
   
   if (overlayToDisplay !== 'Clear')
     return (
          <div className="overlayContainer">
            <div className="overlayWhiteBox">
              {message &&
                <ShowAlertMessage type={type} message={message} />
              }
              {overlayToDisplay === 'CreateProject' && <CreateProject />}
              {overlayToDisplay === 'EditProject' && <EditProject />}
              {overlayToDisplay === 'DeleteProject' && <DeleteProject />}
              {overlayToDisplay === 'CreateProjectDocument' && <CreateProjectDocument />}
              {overlayToDisplay === 'DeleteProjectDoc' && <DeleteProjectDocument />}
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
