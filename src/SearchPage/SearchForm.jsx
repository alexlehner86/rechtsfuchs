import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchFormTopInputFields, RechtsquellenItemBundesrecht, RechtsquellenItemLandesrecht,
         RechtsquellenItemVfgh, RechtsquellenItemVwgh } from './components';
import { alertActionsSearchForm, searchRIS_Actions } from '../_actions';
import './SearchForm.css';

import $ from 'jquery';
import moment from 'moment';

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.setStateHandler = this.setStateHandler.bind(this);
  }

  render() {
    // alertSearchForm contains error and success messages
    const { alertSearchForm} = this.props;

    return (
      <div className="searchFormWrapper">
        <h2>Im RIS suchen nach:</h2>
        {alertSearchForm.message &&
            <div className={`alert ${alertSearchForm.type}`}>{alertSearchForm.message}</div>
        }
        <form onSubmit={this.handleSubmit}>
          <SearchFormTopInputFields values={this.state} handleChange={this.handleChange} setStateOfParent={this.setStateHandler} />
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

  setStateHandler(parameters) {
    this.setState(parameters);
  }

  handleSubmit(e) {    
    let submitSearchQuery = true;
    let errorMessage = '';
    const { dispatch } = this.props;

    //if "datumVon" is set then check whether it has the correct format
    if (this.state.datumVon) {
      if (moment(this.state.datumVon, "YYYY-MM-DD", true).isValid()) {      
        //compare "datumVon" with "datumBis" (meaning: date from / date until)
        if (new Date(this.state.datumVon) > new Date(this.state.datumBis)) {
          //if "datumVon" is a later date than "datumBis", show error message
          submitSearchQuery = false;
          errorMessage += '/// Das Von-Datum muss vor dem Bis-Datum liegen ';
        }
      } else {
        errorMessage += '/// Bitte das Von-Datum im Format DD/MM/YYYY eingeben ';
        submitSearchQuery = false;
      }
    }

    // check whether "datumBis" has the correct format
    if (!moment(this.state.datumBis, "YYYY-MM-DD", true).isValid()) {   
      errorMessage += '/// Bitte das Bis-Datum im Format DD/MM/YYYY eingeben ';
      submitSearchQuery = false;
    }
    
    //check if at least one "Rechtsquelle" (= source of law) has been selected
    if (!$('#bundesrecht').is(':checked') &&
        !$('#landesrecht').is(':checked') &&
        !$('#vwgh').is(':checked') &&
        !$('#vfgh').is(':checked')) {
      submitSearchQuery = false;
      errorMessage += '/// Bitte mindestens eine Rechtsquelle auswählen ';
    }
      
    if (submitSearchQuery) {
      //clear error messages
      dispatch(alertActionsSearchForm.clear());

      const newSearchQuery = {
        pageNumber: 1,
        suchworte: this.state.suchworte,
        vwghGeschaeftszahl: this.state.vwghGeschaeftszahl,
        vwghEntscheidungsart: this.state.vwghEntscheidungsart,
        vwghDokumenttyp: this.state.vwghDokumenttyp,
        vfghGeschaeftszahl: this.state.vfghGeschaeftszahl,
        vfghEntscheidungsart: this.state.vfghEntscheidungsart,
        vfghDokumenttyp: this.state.vfghDokumenttyp,
        bundesrechtTyp: this.state.bundesrechtTyp,
        bundesland: this.state.bundesland,
        landesrechtTyp: this.state.landesrechtTyp
      };

      // if "Wien" is chosen, then the "landesrechtTyp" has to be adapted
      if (newSearchQuery.bundesland === 'Wien') {
        switch (newSearchQuery.landesrechtTyp) {
          case 'LG':
            newSearchQuery.landesrechtTyp = 'Landesgesetz';
            break;
          case 'V':
            newSearchQuery.landesrechtTyp = 'Verordnung';
            break;
          case 'K':
            newSearchQuery.landesrechtTyp = 'Kundmachung';
            break;
          default:
        }
      }

      let datumVonString = '';
      if (this.state.datumVon) {
        datumVonString = new Date(this.state.datumVon).toJSON().slice(0,10);
      }
      newSearchQuery.datumVon = datumVonString;
      newSearchQuery.datumBis = new Date(this.state.datumBis).toJSON().slice(0,10);

      //fetch data from the RIS api and/ or clear data in the redux store if "Rechtsquelle" has been deselected
      if ($('#bundesrecht').is(':checked')) dispatch(searchRIS_Actions.fetchBundesrecht(newSearchQuery));
      else dispatch(searchRIS_Actions.clearBundesrecht());
      if ($('#landesrecht').is(':checked')) dispatch(searchRIS_Actions.fetchLandesrecht(newSearchQuery));
      else dispatch(searchRIS_Actions.clearLandesrecht());
      if ($('#vwgh').is(':checked')) dispatch(searchRIS_Actions.fetchVwGH(newSearchQuery));
      else dispatch(searchRIS_Actions.clearVwGH());
      if ($('#vfgh').is(':checked')) dispatch(searchRIS_Actions.fetchVfGH(newSearchQuery));
      else dispatch(searchRIS_Actions.clearVfGH());

      //scroll to the top of the "Search-Results" element, with a 0.5 second delay
      setTimeout(() => {
        document.getElementById('Search-Results').scrollIntoView(true);
      }, 500);

    } else {
      //show error messages (with the first three "/" removed)
      dispatch(alertActionsSearchForm.error(errorMessage.slice(3, errorMessage.length)));

      //scroll to the top of the "Search-Form" element
      document.getElementById('Search-Form').scrollIntoView(true);
    }
    e.preventDefault();
  }
  
  handleReset(e) {
    // hide the "Rechtsquellen" (=soruce of law) options
    $('#bundesrechtOptionen').hide();
    $('#landesrechtOptionen').hide();
    $('#vwghOptionen').hide();
    $('#vfghOptionen').hide();
    
    $('#bundesrechtHeader').removeClass('highlightHeader');
    $('#landesrechtHeader').removeClass('highlightHeader');
    $('#vwghHeader').removeClass('highlightHeader');
    $('#vfghHeader').removeClass('highlightHeader');

    // clear error messages
    const { dispatch } = this.props;
    dispatch(alertActionsSearchForm.clear());

    // clear the data in the redux store
    dispatch(searchRIS_Actions.clearBundesrecht());
    dispatch(searchRIS_Actions.clearLandesrecht());
    dispatch(searchRIS_Actions.clearVwGH());
    dispatch(searchRIS_Actions.clearVfGH());
    
    // empty the component's state
    const emptySearchQuery = {
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

    this.setState(emptySearchQuery);
  }
  
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSelection(e) {
    // if user selects a "Rechtsquelle" (= source of law), then set the options to their default values,
    // show the options and highlight the "Rechtsquelle"-header (on deselect: hide options and de-highlight)
    if (e.target.id === 'bundesrecht') {
        $('#bundesrechtHeader').toggleClass('highlightHeader');
        $('#bundesrechtOptionen').slideToggle('fast');
        if ($('#bundesrecht').is(':checked')) this.setState({ bundesrechtTyp: '' });
    } else if (e.target.id === 'landesrecht') {
        $('#landesrechtHeader').toggleClass('highlightHeader');
        $('#landesrechtOptionen').slideToggle('fast');
        if ($('#landesrecht').is(':checked')) this.setState({ bundesland: '', landesrechtTyp: '' });
    } else if (e.target.id === 'vwgh') {
        $('#vwghHeader').toggleClass('highlightHeader');
        $('#vwghOptionen').slideToggle('fast');
        if ($('#vwgh').is(':checked')) this.setState({ vwghGeschaeftszahl: '', vwghEntscheidungsart: '', vwghDokumenttyp: '' });
    } else if (e.target.id === 'vfgh') {
        $('#vfghHeader').toggleClass('highlightHeader');
        $('#vfghOptionen').slideToggle('fast');
        if ($('#vfgh').is(':checked')) this.setState({ vfghGeschaeftszahl: '', vfghEntscheidungsart: '', vfghDokumenttyp: '' });
    }
  }

  componentDidMount() {
    // When the user switches back from a different section of the website to the SearchPage and
    // there's a searchQuery stored in the redux store, then fill out the search form correspondingly
    const rechtsquellenItems = [ { bundesrecht: this.props.searchRIS_Bundesrecht },
                                 { landesrecht: this.props.searchRIS_Landesrecht },
                                 { vfgh: this.props.searchRIS_VfGH },
                                 { vwgh: this.props.searchRIS_VwGH } ];
    let searchQuery = null;

    rechtsquellenItems.forEach(item => {
      const rechtsquelleId = Object.keys(item)[0];
      if (item[rechtsquelleId].searchQuery) {
        searchQuery = item[rechtsquelleId].searchQuery;
        this.setRechtsquelleCheckboxToTrueAndShowOptions(rechtsquelleId);
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