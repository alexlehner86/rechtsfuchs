import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectDocActions, alertActionsProjectMgmt } from '../../_actions';

class DeleteDocumentButton extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    const { documentId } = this.props;

    return (
      <div id={documentId} className="deleteButtonDIV" onClick={this.handleDelete}>x</div>
    );
  }

  handleDelete(e) {
    const { dispatch, projectDocItems } = this.props;
    const event = e || window.event;
    let eveTarget = event.target || event.srcElement;

    dispatch(projectDocActions.selectProjectDoc(projectDocItems[eveTarget.id].id));
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('DeleteProjectDoc'));
  }
}

function mapStateToProps(state) {
  const projectDocItems = state.projectDocs.items;
  return {
    projectDocItems
  };
}

const connectedDeleteDocButton = connect(mapStateToProps)(DeleteDocumentButton);
export { connectedDeleteDocButton as DeleteDocumentButton };