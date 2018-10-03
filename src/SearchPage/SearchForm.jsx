import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchFormTopInputFields, RechtsquellenItemBundesrecht, RechtsquellenItemLandesrecht,
         RechtsquellenItemVfgh, RechtsquellenItemVwgh } from './components';
import { ErrorMessages } from './helpers';
import { searchRIS_Actions, alertActionsSearchForm } from '../_actions';
import { climbUpDOMtreeUntilElementOfType, scrollToTheTopOfElementWithId } from '../_helpers';
import './SearchForm.css';
import $ from 'jquery';
import moment from 'moment';

const rechtsquellenArray = [ 
  { id: 'bundesrecht', reduxObjectName: 'searchRIS_Bundesrecht', 
    fetchResults: searchRIS_Actions.fetchBundesrecht, clearResults: searchRIS_Actions.clearBundesrecht,
    defaultValues: { bundesrechtTyp: '', bundesrechtParagraphArtAnlTyp: '', bundesrechtParagraphArtAnlNummer: '' } },
  { id: 'landesrecht', reduxObjectName: 'searchRIS_Landesrecht', 
    fetchResults: searchRIS_Actions.fetchLandesrecht, clearResults: searchRIS_Actions.clearLandesrecht,
    defaultValues: { bundesland: '', landesrechtTyp: '', landesrechtParagraphArtAnlTyp: '', landesrechtParagraphArtAnlNummer: '' } },
  { id: 'vfgh', reduxObjectName: 'searchRIS_VfGH', 
    fetchResults: searchRIS_Actions.fetchVfGH, clearResults: searchRIS_Actions.clearVfGH,
    defaultValues: { vwghGeschaeftszahl: '', vwghEntscheidungsart: '', vwghDokumenttyp: '' } },
  { id: 'vwgh', reduxObjectName: 'searchRIS_VwGH', 
    fetchResults: searchRIS_Actions.fetchVwGH, clearResults: searchRIS_Actions.clearVwGH,
    defaultValues: { vfghGeschaeftszahl: '', vfghEntscheidungsart: '', vfghDokumenttyp: '' } }
];

class SearchForm extends Component {
  constructor(props) {
    super(props);

    // the component's state stores the user's search form input
    this.state = this.getDefaultSearchFormValues();

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

  getDefaultSearchFormValues() {
    let defaultValues = {
      pageNumber: 1,
      suchworte: '',
      datumVon: '',
      datumBis: new Date()
    }

    rechtsquellenArray.forEach(rechtsquelle => {
      Object.assign(defaultValues, rechtsquelle.defaultValues);
    });

    return defaultValues;
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
    $(`#${rechtsquelleId}`).addClass('highlightHeader');
    $(`#${rechtsquelleId}Checkbox`).prop('checked', true);
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
    const event = e || window.event;
    let eventTarget = event.target || event.srcElement;
    const triggeringElementIsCheckbox = eventTarget.nodeName === 'INPUT';
    eventTarget = climbUpDOMtreeUntilElementOfType(eventTarget, 'DIV');
    const selectedRechtsquelleId = eventTarget.id;
    
    if (!triggeringElementIsCheckbox) {
      this.toggleRechtsquelleCheckbox(selectedRechtsquelleId);
    }

    $(`#${selectedRechtsquelleId}`).toggleClass('highlightHeader');
    $(`#${selectedRechtsquelleId}Optionen`).slideToggle('fast');
    if ($(`#${selectedRechtsquelleId}Checkbox`).is(':checked')) {
      const defaultValues = rechtsquellenArray.find(rechtsquelle => rechtsquelle.id === selectedRechtsquelleId).defaultValues;
      this.setState(defaultValues);
    }
  }

  toggleRechtsquelleCheckbox(rechtsquelleId) {
    const rechtsquelleCheckboxStatus = $(`#${rechtsquelleId}Checkbox`).is(':checked');
    $(`#${rechtsquelleId}Checkbox`).prop('checked', !rechtsquelleCheckboxStatus);
  }

  handleSubmit(e) {
    const { dispatch } = this.props;
    let errorMessages = this.checkUserInputForErrors();

    if (!errorMessages.isEmpty()) {
      dispatch(alertActionsSearchForm.error(errorMessages.getErrorStringWithSeparator('///')));
      scrollToTheTopOfElementWithId('Search-Form', 0);

    } else {
      const newSearchQuery = JSON.parse(JSON.stringify(this.state));
      newSearchQuery.datumVon = this.state.datumVon ? this.convertDateIntoFormatYYYYMMDD(this.state.datumVon) : '';
      newSearchQuery.datumBis = this.convertDateIntoFormatYYYYMMDD(this.state.datumBis);

      rechtsquellenArray.forEach(rechtsquelle => {
        if ($(`#${rechtsquelle.id}Checkbox`).is(':checked')) {
          dispatch(rechtsquelle.fetchResults(newSearchQuery));
        } else {
          dispatch(rechtsquelle.clearResults());
        }
      });
      this.clearSearchFormAlerts();
      scrollToTheTopOfElementWithId('Search-Results', 500);
    }

    e.preventDefault();
  }

  checkUserInputForErrors() {
    let errorMessages = new ErrorMessages();

    let isAtLeastOneRechtsquelleChecked = false; 
    rechtsquellenArray.forEach(rechtsquelle => {
      if ($(`#${rechtsquelle.id}Checkbox`).is(':checked')) {
        isAtLeastOneRechtsquelleChecked = true;
      }
    });
    if (!isAtLeastOneRechtsquelleChecked) {
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
  
  handleReset(e) {
    this.hideRechtsquellenOptions();
    this.clearDataInReduxStore();
    this.setState(this.getDefaultSearchFormValues());
  }

  hideRechtsquellenOptions() {
    rechtsquellenArray.forEach(rechtsquelle => {
      $(`#${rechtsquelle.id}Optionen`).hide();
      $(`#${rechtsquelle.id}`).removeClass('highlightHeader');
    });
  }

  clearDataInReduxStore() {
    const { dispatch } = this.props;

    rechtsquellenArray.forEach(rechtsquelle => {
      dispatch(rechtsquelle.clearResults());
    });
    dispatch(alertActionsSearchForm.clear());
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