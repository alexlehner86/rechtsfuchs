import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchFormTopInputFields, RechtsquellenItemBundesrecht, RechtsquellenItemLandesrecht,
         RechtsquellenItemVfgh, RechtsquellenItemVwgh } from './components';
import { ErrorMessages } from './helpers';
import { searchRIS_Actions, alertActionsSearchForm } from '../_actions';
import './SearchForm.css';

import $ from 'jquery';
import moment from 'moment';

const rechtsquellenArray = [ 
  { id: 'bundesrecht', reduxObjectName: 'searchRIS_Bundesrecht', 
    fetchResults: searchRIS_Actions.fetchBundesrecht, clearResults: searchRIS_Actions.clearBundesrecht },
  { id: 'landesrecht', reduxObjectName: 'searchRIS_Landesrecht', 
    fetchResults: searchRIS_Actions.fetchLandesrecht, clearResults: searchRIS_Actions.clearLandesrecht },
  { id: 'vfgh', reduxObjectName: 'searchRIS_VfGH', 
    fetchResults: searchRIS_Actions.fetchVfGH, clearResults: searchRIS_Actions.clearVfGH },
  { id: 'vwgh', reduxObjectName: 'searchRIS_VwGH', 
    fetchResults: searchRIS_Actions.fetchVwGH, clearResults: searchRIS_Actions.clearVwGH }
];

class SearchForm extends Component {
  constructor(props) {
    super(props);

    // the component's state stores the user's search form input
    this.state = {
      pageNumber: 1,
      suchworte: '',
      datumVon: '',
      datumBis: new Date(),
      bundesrechtTyp: '',
      bundesland: '',
      landesrechtTyp: '',
      vwghGeschaeftszahl: '',
      vwghEntscheidungsart: '',
      vwghDokumenttyp: '',
      vfghGeschaeftszahl: '',
      vfghEntscheidungsart: '',
      vfghDokumenttyp: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSetState = this.handleSetState.bind(this);
  }

  render() {
    //alertSearchForm contains error and success messages
    const { alertSearchForm} = this.props;

    return (
      <div className="searchFormWrapper">
        <h2>Im RIS suchen nach:</h2>
        {alertSearchForm.message &&
          <div className={`alert ${alertSearchForm.type}`}>{alertSearchForm.message}</div>
        }
        <form onSubmit={this.handleSubmit}>
          <SearchFormTopInputFields values={this.state} handleChange={this.handleChange} setStateOfParent={this.handleSetState} />
          <div className="rechtsquellenContainer">
            <h3>Rechtsquellen</h3>
            <RechtsquellenItemBundesrecht values={this.state} handleSelection={this.handleSelection} handleChange={this.handleChange} />
            <RechtsquellenItemLandesrecht values={this.state} handleSelection={this.handleSelection} handleChange={this.handleChange} />
            <RechtsquellenItemVfgh values={this.state} handleSelection={this.handleSelection} handleChange={this.handleChange} />
            <RechtsquellenItemVwgh values={this.state} handleSelection={this.handleSelection} handleChange={this.handleChange} />
          </div>
          <div className="centerDIV">
            <button id="submitButton" className="btn btn-primary" type="submit">Suchen</button>&nbsp;
            <button id="resetButton" className="btn btn-default" type="reset" onClick={this.handleReset}>Reset</button>
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    // When the user switches back from a different section of the website to the SearchPage and
    // there's a searchQuery stored in the redux store, then fill out the search form correspondingly
    let searchQuery = null;
    rechtsquellenArray.forEach(rechtsquelle => {
      const rechtsquelleReduxData = this.props[rechtsquelle.reduxObjectName];
      if (rechtsquelleReduxData.searchQuery) {
        searchQuery = rechtsquelleReduxData.searchQuery;
        this.setRechtsquelleCheckboxToTrueAndShowOptions(rechtsquelle.id);
      }
    });

    // if there's at least one searchQuery in the redux store, then set the react component's state
    if (searchQuery) this.setState(searchQuery);
  }

  setRechtsquelleCheckboxToTrueAndShowOptions(rechtsquelleId) {
    $(`#${rechtsquelleId}`).prop('checked', true);
    $(`#${rechtsquelleId}Header`).addClass('highlightHeader');
    $(`#${rechtsquelleId}Optionen`).show();
  }

  componentWillUnmount() {
    this.clearSearchFormAlerts();
  }

  clearSearchFormAlerts() {
    const { dispatch } = this.props;
    dispatch(alertActionsSearchForm.clear());
  }

  handleSetState(parameters) {
    this.setState(parameters);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSelection(e) {
    // if user selects a "Rechtsquelle" (= source of law), then set the options to their default values,
    // show the options and highlight the "Rechtsquelle"-header (on deselect: hide options and de-highlight)
    const selectedRechtsquelle = e.target.id;
    const resetValues = { 
            bundesrecht: { bundesrechtTyp: '' },
            landesrecht: { bundesland: '', landesrechtTyp: '' },
            vwgh: { vwghGeschaeftszahl: '', vwghEntscheidungsart: '', vwghDokumenttyp: '' },
            vfgh: { vfghGeschaeftszahl: '', vfghEntscheidungsart: '', vfghDokumenttyp: '' }
    };

    $(`#${selectedRechtsquelle}Header`).toggleClass('highlightHeader');
    $(`#${selectedRechtsquelle}Optionen`).slideToggle('fast');
    if ($(`#${selectedRechtsquelle}`).is(':checked')) {
      this.setState(resetValues[selectedRechtsquelle]);
    }
  }

  handleSubmit(e) {
    const { dispatch } = this.props;
    let errorMessages = this.checkUserInputForErrors();

    if (!errorMessages.isEmpty()) {
      dispatch(alertActionsSearchForm.error(errorMessages.getErrorStringWithSeparator('///')));
      this.scrollToTheTopOfElementWithId('Search-Form', 0);

    } else {
      const newSearchQuery = JSON.parse(JSON.stringify(this.state));
      newSearchQuery.datumVon = this.state.datumVon ? this.convertDateIntoFormatYYYYMMDD(this.state.datumVon) : '';
      newSearchQuery.datumBis = this.convertDateIntoFormatYYYYMMDD(this.state.datumBis);

      rechtsquellenArray.forEach(rechtsquelle => {
        if ($(`#${rechtsquelle.id}`).is(':checked')) {
          dispatch(rechtsquelle.fetchResults(newSearchQuery));
        } else {
          dispatch(rechtsquelle.clearResults());
        }
      });
      this.clearSearchFormAlerts();
      this.scrollToTheTopOfElementWithId('Search-Results', 500);
    }

    e.preventDefault();
  }

  checkUserInputForErrors() {
    let errorMessages = new ErrorMessages();
     
    if (!$('#bundesrecht').is(':checked') && !$('#landesrecht').is(':checked') &&
        !$('#vwgh').is(':checked') && !$('#vfgh').is(':checked')) {
      errorMessages.addMessage('Bitte mindestens eine Rechtsquelle auswählen');
    }

    if (this.state.datumVon) {
      if (!this.dateHasThisFormat(this.state.datumVon, "YYYY-MM-DD")) {
        errorMessages.addMessage('Bitte das Von-Datum im Format DD/MM/YYYY eingeben');
      } else {
        if (new Date(this.state.datumVon) > new Date(this.state.datumBis)) {
          errorMessages.addMessage('Das Von-Datum muss vor dem Bis-Datum liegen');
        }
      }
    }

    if (!this.dateHasThisFormat(this.state.datumBis, "YYYY-MM-DD")) {   
      errorMessages.addMessage('Bitte das Bis-Datum im Format DD/MM/YYYY eingeben');
    }

    return errorMessages;
  }

  dateHasThisFormat(date, formatString) {
    return moment(date, formatString, true).isValid();
  }

  convertDateIntoFormatYYYYMMDD(dateToConvert) {
    return new Date(dateToConvert).toJSON().slice(0,10);
  }

  scrollToTheTopOfElementWithId(id, delayInMilliseconds) {
    setTimeout(() => {
      document.getElementById(id).scrollIntoView(true);
    }, delayInMilliseconds);
  }
  
  handleReset(e) {
    this.hideRechtsquellenOptions();
    this.clearDataInReduxStore();
    this.resetStateValues();
  }

  hideRechtsquellenOptions() {
    rechtsquellenArray.forEach(rechtsquelle => {
      $(`#${rechtsquelle.id}Optionen`).hide();
      $(`#${rechtsquelle.id}Header`).removeClass('highlightHeader');
    });
  }

  clearDataInReduxStore() {
    const { dispatch } = this.props;

    rechtsquellenArray.forEach(rechtsquelle => {
      dispatch(rechtsquelle.clearResults());
    });
    dispatch(alertActionsSearchForm.clear());
  }

  resetStateValues() {
    this.setState({
      pageNumber: 1,
      suchworte: '',
      datumVon: '',
      datumBis: new Date(),
      bundesrechtTyp: '',
      bundesland: '',
      landesrechtTyp: '',
      vwghGeschaeftszahl: '',
      vwghEntscheidungsart: '',
      vwghDokumenttyp: '',
      vfghGeschaeftszahl: '',
      vfghEntscheidungsart: '',
      vfghDokumenttyp: ''
    });
  }
}

function mapStateToProps(state) {
  const { alertSearchForm, searchRIS_Bundesrecht, searchRIS_Landesrecht, searchRIS_VwGH, searchRIS_VfGH } = state;
  return {
    alertSearchForm,
    searchRIS_Bundesrecht,
    searchRIS_Landesrecht,
    searchRIS_VwGH,
    searchRIS_VfGH
  };
}

const connectedSearchForm = connect(mapStateToProps)(SearchForm);
export { connectedSearchForm as SearchForm }; 