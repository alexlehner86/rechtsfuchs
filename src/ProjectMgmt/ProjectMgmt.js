import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateProjectPage, EditProjectPage, DeleteProjectPage, 
         CreateProjectDocPage, DeleteProjectDocPage } from './Pages';

class ProjectManagement extends Component {

  render() {
   //alertProjectMgmt definiert, ob CreatProjectPage etc. angezeigt wird
   //...und enthält Fehler- und Erfolgsmeldungen
   const { alertProjectMgmt } = this.props;
   
   if (alertProjectMgmt.overlayToDisplay !== 'Clear')
     return (
          <div className="overlayContainer">
            <div className="overlayWhiteBox">
              {alertProjectMgmt.message &&
                <div className={`alert ${alertProjectMgmt.type}`}>{alertProjectMgmt.message}</div>
              }
              {alertProjectMgmt.overlayToDisplay === 'CreateProject' && <CreateProjectPage />}
              {alertProjectMgmt.overlayToDisplay === 'EditProject' && <EditProjectPage />}
              {alertProjectMgmt.overlayToDisplay === 'DeleteProject' && <DeleteProjectPage />}
              {alertProjectMgmt.overlayToDisplay === 'CreateProjectDoc' && <CreateProjectDocPage />}
              {alertProjectMgmt.overlayToDisplay === 'DeleteProjectDoc' && <DeleteProjectDocPage />}
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
