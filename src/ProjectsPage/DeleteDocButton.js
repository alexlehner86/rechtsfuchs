import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectDocActions } from '../_actions';

class DeleteDocButton extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    const { dispatch, projectDocItems } = this.props;

    //Dokument löschen
    dispatch(projectDocActions.delete(projectDocItems[e.target.id]));
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