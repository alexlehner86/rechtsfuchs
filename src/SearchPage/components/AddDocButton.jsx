import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActionsProjectMgmt, searchRIS_Actions } from '../../_actions';

class AddDocButton extends Component {
  constructor(props) {
    super(props);

    this.handleAddDocument = this.handleAddDocument.bind(this);
  }

  handleAddDocument(e) {
    const { dispatch, rechtsquelle, resultID } = this.props;

    // save "resultID" in the corresponding redux store item so that
    // the project management overlay can retrieve the correct information
    switch (rechtsquelle) {
      case 'bundesrecht':
        dispatch(searchRIS_Actions.addBundesrechtResult(resultID));
        break;
      case 'landesrecht':
        dispatch(searchRIS_Actions.addLandesrechtResult(resultID));
        break;
      case 'vfgh':
        dispatch(searchRIS_Actions.addVfGHResult(resultID));
        break;
      case 'vwgh':
        dispatch(searchRIS_Actions.addVwGHResult(resultID));
        break;
      default:
        console.log('Keine Rechtsquelle angegeben');
    }

    //Show Create-Project-Document-Page
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('CreateProjectDoc'));
  }
  
  render() {
    return (
      <button className="btn btn-default btn-sm" type="button" onClick={this.handleAddDocument} title="Dokument in Projekt-Ordner speichern">
        <img src="./icons/save.svg" className="addButton" alt="Dokument speichern" /> &nbsp;Speichern
      </button>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedAddDocButton = connect(mapStateToProps)(AddDocButton);
export { connectedAddDocButton as AddDocButton };