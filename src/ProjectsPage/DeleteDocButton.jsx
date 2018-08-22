import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectDocActions, alertActionsProjectMgmt } from '../_actions';

class DeleteDocButton extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    const { dispatch, projectDocItems } = this.props;
    const event = e || window.event;
    let eveTarget = event.target || event.srcElement;

    //Dokument-ID im React-Store als selectedProjectDocID hinterlegen
    dispatch(projectDocActions.selectProjectDoc(projectDocItems[eveTarget.id].id));

    //pass 'DeleteProjectDoc' to Redux-Store to show corresponding page
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('DeleteProjectDoc'));
  }
  
  render() {
    const { documentId } = this.props;

    return (
      <div id={documentId} className="deleteButtonDIV" onClick={this.handleDelete}>x</div>
    );
  }
}

function mapStateToProps(state) {
  const projectDocItems = state.projectDocs.items;
  return {
    projectDocItems
  };
}

const connectedDeleteDocButton = connect(mapStateToProps)(DeleteDocButton);
export { connectedDeleteDocButton as DeleteDocButton };