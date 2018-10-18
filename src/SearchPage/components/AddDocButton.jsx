import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActionsProjectMgmt, projectDocActions } from '../../_actions';

class AddDocButton extends Component {
  constructor(props) {
    super(props);

    this.handleAddDocument = this.handleAddDocument.bind(this);
  }
  
  render() {
    return (
      <button className="btn btn-default btn-sm addButton" type="button" onClick={this.handleAddDocument} title="Dokument in Projekt-Ordner speichern">
        <img src="./icons/save.svg" className="addIcon" alt="" /> &nbsp;Speichern
      </button>
    );
  }

  handleAddDocument(e) {
    const { dispatch, resultItem } = this.props;

    dispatch(projectDocActions.addRISsearchResultItem(resultItem));
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('CreateProjectDocument'));
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedAddDocButton = connect(mapStateToProps)(AddDocButton);
export { connectedAddDocButton as AddDocButton };