import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActionsProjectMgmt } from '../../_actions';

class AddDocButton extends Component {
  constructor(props) {
    super(props);

    this.handleAddDocument = this.handleAddDocument.bind(this);
  }
  
  render() {
    return (
      <button className="btn btn-default btn-sm" type="button" onClick={this.handleAddDocument} title="Dokument in Projekt-Ordner speichern">
        <img src="./icons/save.svg" className="addButton" alt="Dokument speichern" /> &nbsp;Speichern
      </button>
    );
  }

  handleAddDocument(e) {
    const { dispatch, resultID, addSearchResults } = this.props;

    // Save resultID in the Store so that the CreateProjectDocPage can access it
    dispatch(addSearchResults(resultID));

    //Show Create-Project-Document-Page
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('CreateProjectDoc'));
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedAddDocButton = connect(mapStateToProps)(AddDocButton);
export { connectedAddDocButton as AddDocButton };