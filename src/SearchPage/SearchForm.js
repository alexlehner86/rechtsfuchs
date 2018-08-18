import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActionsSearchForm, searchRIS_Actions } from '../_actions';

import 'moment/locale/de-at.js';
import { DatePickerInput } from 'rc-datepicker';
import moment from 'moment';
import $ from 'jquery';
import { datalistSuchworte } from './datalists';
import './SearchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seitennummer: 1,
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
  }
  
  handleSubmit(e) {    
    let submitSearchQuery = true;
    let errorMessage = '';
    const { dispatch } = this.props;

    //Falls Von-Datum vorhanden, dann überprüfen, ob korrektes Datum-Format
    if (this.state.datumVon) {
      if (moment(this.state.datumVon, "YYYY-MM-DD", true).isValid()) {      
        //Von-Datum mit Bis-Datum vergleichen
        if (new Date(this.state.datumVon) > new Date(this.state.datumBis)) {
          //Falls Von-Datum nicht vor Bis-Datum liegt, Fehlermeldung ausgeben
          submitSearchQuery = false;
          errorMessage += '/// Das Von-Datum muss vor dem Bis-Datum liegen ';
        }
      } else {
        errorMessage += '/// Bitte das Von-Datum im Format DD/MM/YYYY eingeben ';
        submitSearchQuery = false;
      }
    }

    //Überprüfen, ob Bis-Datum im korrekten Format
    if (!moment(this.state.datumBis, "YYYY-MM-DD", true).isValid()) {   
      errorMessage += '/// Bitte das Bis-Datum im Format DD/MM/YYYY eingeben ';
      submitSearchQuery = false;
    }
    
    //Überprüfen, ob mindestens eine Rechtsquelle ausgewählt wurde
    if (!$('#bundesrecht').is(':checked') &&
        !$('#landesrecht').is(':checked') &&
        !$('#vwgh').is(':checked') &&
        !$('#vfgh').is(':checked')) {
      submitSearchQuery = false;
      errorMessage += '/// Bitte mindestens eine Rechtsquelle auswählen ';
    }
      
    if (submitSearchQuery) {
      //Fehlermeldungen bereinigen
      dispatch(alertActionsSearchForm.clear());

      const newSearchQuery = {
        seitennummer: 1,
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
      let datumVonString = '';
      if (this.state.datumVon) {
        datumVonString = new Date(this.state.datumVon).toJSON().slice(0,10);
      }
      newSearchQuery.datumVon = datumVonString;
      newSearchQuery.datumBis = new Date(this.state.datumBis).toJSON().slice(0,10);

      //Daten aus dem RIS abrufen und im Redux-Store speichern...
      //...bzw. Daten bereinigen, falls Rechtsquelle abgewählt wurde
      if ($('#bundesrecht').is(':checked')) dispatch(searchRIS_Actions.fetchBundesrecht(newSearchQuery));
      else dispatch(searchRIS_Actions.clearBundesrecht());
      if ($('#landesrecht').is(':checked')) dispatch(searchRIS_Actions.fetchLandesrecht(newSearchQuery));
      else dispatch(searchRIS_Actions.clearLandesrecht());
      if ($('#vwgh').is(':checked')) dispatch(searchRIS_Actions.fetchVwGH(newSearchQuery));
      else dispatch(searchRIS_Actions.clearVwGH());
      if ($('#vfgh').is(':checked')) dispatch(searchRIS_Actions.fetchVfGH(newSearchQuery));
      else dispatch(searchRIS_Actions.clearVfGH());

      //Zum Anfang des SearchResults-Elements scrollen, mit 0.5 Sekunden Verzögerung
      setTimeout(() => {
        document.getElementById('Search-Results').scrollIntoView(true);
      }, 500);

    } else {
      //Fehlermeldungen anzeigen, dabei erste drei "/" abschneiden
      dispatch(alertActionsSearchForm.error(errorMessage.slice(3, errorMessage.length)));

      //Ganz nach oben scrollen
      document.getElementById('Search-Form').scrollIntoView(true);
    }
    e.preventDefault();
  }
  
  handleReset(e) {
    //Rechtsquellen-Optionen wieder einklappen
    $('#bundesrechtOptionen').hide();
    $('#landesrechtOptionen').hide();
    $('#vwghOptionen').hide();
    $('#vfghOptionen').hide();
    
    $('#bundesrechtHeader').removeClass('highlightHeader');
    $('#landesrechtHeader').removeClass('highlightHeader');
    $('#vwghHeader').removeClass('highlightHeader');
    $('#vfghHeader').removeClass('highlightHeader');

    //Fehlermeldungen bereinigen
    const { dispatch } = this.props;
    dispatch(alertActionsSearchForm.clear());

    //Daten im Redux-Store bereinigen
    dispatch(searchRIS_Actions.clearBundesrecht());
    dispatch(searchRIS_Actions.clearLandesrecht());
    dispatch(searchRIS_Actions.clearVwGH());
    dispatch(searchRIS_Actions.clearVfGH());
    
    //leere searchQuery
    const emptySearchQuery = {
      seitennummer: 1,
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
    if (e.target.id === 'bundesrecht') {
        $('#bundesrechtHeader').toggleClass('highlightHeader');
        $('#bundesrechtOptionen').slideToggle('fast');
        //Falls Nutzer die Rechtsquelle auswählt, dann alle Optionen auf Standard-Wert setzen
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
    //Search-Form mit searchQuery-Parametern befüllen, falls vorhanden
    //Ausgewählte Rechtsquellen anhaken und Optionen einblenden
    const { searchRIS_Bundesrecht, searchRIS_Landesrecht, searchRIS_VwGH, searchRIS_VfGH } = this.props;
    let searchQuery = {};
    if (searchRIS_Bundesrecht.searchQuery) {
      searchQuery = searchRIS_Bundesrecht.searchQuery;
      $("#bundesrecht").prop("checked", true);
      $('#bundesrechtHeader').addClass('highlightHeader');
      $('#bundesrechtOptionen').show();
    }
    if (searchRIS_Landesrecht.searchQuery) {
      searchQuery = searchRIS_Landesrecht.searchQuery;
      $("#landesrecht").prop("checked", true);
      $('#landesrechtHeader').addClass('highlightHeader');
      $('#landesrechtOptionen').show();
    }
    if (searchRIS_VwGH.searchQuery) {
      searchQuery = searchRIS_VwGH.searchQuery;
      $("#vwgh").prop("checked", true);
      $('#vwghHeader').addClass('highlightHeader');
      $('#vwghOptionen').show();
    }
    if (searchRIS_VfGH.searchQuery) {
      searchQuery = searchRIS_VfGH.searchQuery;
      $("#vfgh").prop("checked", true);
      $('#vfghHeader').addClass('highlightHeader');
      $('#vfghOptionen').show();
    }

    //falls zumindest eine searchQuery einer Rechtsquelle vorhanden (=searchQuery nicht leer)
    if (searchQuery.seitennummer) this.setState(searchQuery);
  }

  render() {
    //alertSearchForm enthält Fehler- und Erfolgsmeldungen
    const { alertSearchForm} = this.props;

    return (
          <div>
            {datalistSuchworte}
        
            <h2>Im RIS suchen nach:</h2>
            {alertSearchForm.message &&
                <div className={`alert ${alertSearchForm.type}`}>{alertSearchForm.message}</div>
            }
            <form className="searchForm" onSubmit={this.handleSubmit}>
              <p>Suchworte:</p><input id="suchworte" list="Begriffe" value={this.state.suchworte} onChange={this.handleChange} />
              <p>Datum von:</p>
                <DatePickerInput 
                  displayFormat='DD/MM/YYYY'
                  returnFormat='YYYY-MM-DD'
                  className='datumInputStyle'
                  onChange={(jsDate, dateString) => this.setState({ datumVon: dateString })}
                  value={this.state.datumVon}
                  showOnInputClick
                  placeholder=''
                  locale='de-at'
                /><br />
              <p>bis:</p>
                <DatePickerInput 
                  displayFormat='DD/MM/YYYY'
                  returnFormat='YYYY-MM-DD'
                  className='datumInputStyle'
                  onChange={(jsDate, dateString) => this.setState({ datumBis: dateString })}
                  value={this.state.datumBis}
                  showOnInputClick
                  placeholder=''
                  locale='de-at'
                /><br />
                
                <div className="rechtsquellenContainer">
                 <h3>Rechtsquellen</h3>
                 
                 {/* Bundesrecht */}
                 <div className="rechtsquellenItemsContainer">
                   <div id="bundesrechtHeader" className="rechtsquellenItemsHeader">
                     <input type="checkbox" id="bundesrecht" value="bundesrecht" onClick={this.handleSelection} />
                     <p>Bundesrecht</p>
                   </div>
                   <div id="bundesrechtOptionen" className="optionenContainer">
                    <div className="optionZeile">
                     <p>Rechtstyp:</p>
                     <select id="bundesrechtTyp" value={this.state.bundesrechtTyp} onChange={this.handleChange}>
                      <option value="">Alle</option>
                      <option value="BVG">Bundesverfassungsgesetze</option>
                      <option value="BG">Bundesgesetze</option>
                      <option value="V">Verordnungen</option>
                      <option value="K">Kundmachungen</option>
                      <option value="Vertrag">Bi- & multilaterale Verträge</option>
                     </select> 
                    </div>
                   </div>
                 </div>
                 
                 {/* Landesrecht */}
                 <div className="rechtsquellenItemsContainer">
                   <div id="landesrechtHeader" className="rechtsquellenItemsHeader">
                     <input type="checkbox" id="landesrecht" value="landesrecht" onClick={this.handleSelection} />
                     <p>Landesrecht</p>
                   </div>
                   <div id="landesrechtOptionen" className="optionenContainer">
                    <div className="optionZeile">
                     <p>Bundesland:</p>
                     <select id="bundesland" value={this.state.bundesland} onChange={this.handleChange}>
                      <option value="">Alle</option>
                      <option value="Burgenland">Burgenland</option>
                      <option value="Kaernten">Kärnten</option>
                      <option value="Niederoesterreich">Niederösterreich</option>
                      <option value="Oberoesterreich">Oberösterreich</option>
                      <option value="Salzburg">Salzburg</option>
                      <option value="Steiermark">Steiermark</option>
                      <option value="Tirol">Tirol</option>
                      <option value="Vorarlberg">Vorarlberg</option>
                      <option value="Wien">Wien</option>
                     </select>
                    </div>
                    <div className="optionZeile">
                     <p>Rechtstyp:</p>
                     <select id="landesrechtTyp" value={this.state.landesrechtTyp} onChange={this.handleChange}>
                      <option value="">Alle</option>
                      <option value="LVG">Landesverfassungsgesetze</option>
                      <option value="LG">Landesgesetze</option>
                      <option value="V">Verordnungen</option>
                      <option value="K">Kundmachungen</option>
                      <option value="Vereinbarung gem. Art. 15a B-VG">Vereinbarung gem. Art. 15a B-VG</option>
                     </select> 
                    </div>
                   </div>
                 </div>
                 
                 {/* VfGH */}
                 <div className="rechtsquellenItemsContainer">
                   <div id="vfghHeader" className="rechtsquellenItemsHeader">
                     <input type="checkbox" id="vfgh" value="vfgh" onClick={this.handleSelection} />
                     <p>Verfassungsgerichtshof</p>
                   </div>
                   <div id="vfghOptionen" className="optionenContainer">
                    <div className="optionZeile">
                     <p>Geschäftszahl:</p>
                     <input id="vfghGeschaeftszahl" value={this.state.vfghGeschaeftszahl} onChange={this.handleChange} /><br />
                    </div>
                    <div className="optionZeile">
                     <p>Entscheidungsart:</p>
                     <select id="vfghEntscheidungsart" value={this.state.vfghEntscheidungsart} onChange={this.handleChange}>
                      <option value="">Alle</option>
                      <option value="Beschluss">Beschluss</option>
                      <option value="Erkenntnis">Erkenntnis</option>
                      <option value="Vergleich">Vergleich</option>
                     </select> 
                    </div>
                    <div className="optionZeile">
                     <p>Dokumenttyp:</p>
                     <select id="vfghDokumenttyp" value={this.state.vfghDokumenttyp} onChange={this.handleChange}>
                      <option value="">Alle</option>
                      <option value="Rechtssatz">Rechtssatz</option>
                      <option value="Entscheidungstext">Entscheidungstext</option>
                     </select> 
                    </div>
                   </div>
                  </div>

                {/* VwGH */}
                <div className="rechtsquellenItemsContainer">
                   <div id="vwghHeader" className="rechtsquellenItemsHeader">
                     <input type="checkbox" id="vwgh" value="vwgh" onClick={this.handleSelection} />
                     <p>Verwaltungsgerichtshof</p>
                   </div>
                   <div id="vwghOptionen" className="optionenContainer">
                    <div className="optionZeile">
                     <p>Geschäftszahl:</p>
                     <input id="vwghGeschaeftszahl" value={this.state.vwghGeschaeftszahl} onChange={this.handleChange} /><br />
                    </div>
                    <div className="optionZeile">
                     <p>Entscheidungsart:</p>
                     <select id="vwghEntscheidungsart" value={this.state.vwghEntscheidungsart} onChange={this.handleChange}>
                      <option value="">Alle</option>
                      <option value="Beschluss">Beschluss</option>
                      <option value="Erkenntnis">Erkenntnis</option>
                      <option value="BeschlussVS">Beschluss VS</option>
                      <option value="ErkenntnisVS">Erkenntnis VS</option>
                     </select> 
                    </div>
                    <div className="optionZeile">
                     <p>Dokumenttyp:</p>
                     <select id="vwghDokumenttyp" value={this.state.vwghDokumenttyp} onChange={this.handleChange}>
                      <option value="">Alle</option>
                      <option value="Rechtssatz">Rechtssatz</option>
                      <option value="Entscheidungstext">Entscheidungstext</option>
                     </select> 
                    </div>
                   </div>
                 </div>
                </div>
                 
              <div className="centerDIV">
                <button id="submitButton" className="btn btn-primary" type="submit">Suchen</button>&nbsp;
                <button id="resetButton" className="btn btn-default" type="reset" onClick={this.handleReset}>Reset</button>
              </div>
            </form>
          </div>
    );
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