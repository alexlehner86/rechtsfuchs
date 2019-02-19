import React, { Component } from 'react';

class RechtsquellenItemBundesrecht extends Component {
  render() {
    const { values, handleSelection, handleChange } = this.props;

    return (
      <div className="rechtsquellenItemsContainer">
        <div id="bundesrecht" className="rechtsquellenItemsHeader" onClick={handleSelection}>
          <input type="checkbox" id="bundesrechtCheckbox" value="bundesrecht" />
          <p>Bundesrecht</p>
        </div>
        <div id="bundesrechtOptionen" className="optionenContainer">
          <div className="optionZeile">
            <p>Rechtstyp:</p>
            <select id="bundesrechtTyp" value={values.bundesrechtTyp} onChange={handleChange}>
              <option value="">Alle</option>
              <option value="BVG">Bundesverfassungsgesetze</option>
              <option value="BG">Bundesgesetze</option>
              <option value="V">Verordnungen</option>
              <option value="K">Kundmachungen</option>
              <option value="Vertrag">Bi- & multilaterale Verträge</option>
            </select> 
          </div>
          <div className="optionZeile">
            <p>§/Artikel/Anlage:</p>
            <select id="bundesrechtParagraphArtAnlTyp" value={values.bundesrechtParagraphArtAnlTyp} onChange={handleChange}>
              <option value="">Alle</option>
              <option value="Paragraph">§</option>
              <option value="Artikel">Artikel</option>
              <option value="Anlage">Anlage</option>
            </select>
            <input id="bundesrechtParagraphArtAnlNummer" value={values.bundesrechtParagraphArtAnlNummer} onChange={handleChange} />
          </div>
        </div>
      </div>
    );
  }
}

class RechtsquellenItemLandesrecht extends Component {
  render() {
    const { values, handleSelection, handleChange } = this.props;

    return (
      <div className="rechtsquellenItemsContainer">
        <div id="landesrecht" className="rechtsquellenItemsHeader" onClick={handleSelection}>
          <input type="checkbox" id="landesrechtCheckbox" value="landesrecht" />
          <p>Landesrecht</p>
        </div>
        <div id="landesrechtOptionen" className="optionenContainer">
          <div className="optionZeile">
            <p>Bundesland:</p>
            <select id="bundesland" value={values.bundesland} onChange={handleChange}>
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
            <select id="landesrechtTyp" value={values.landesrechtTyp} onChange={handleChange}>
              <option value="">Alle</option>
              <option value="LVG">Landesverfassungsgesetze</option>
              <option value="LG">Landesgesetze</option>
              <option value="V">Verordnungen</option>
              <option value="K">Kundmachungen</option>
              <option value="Vereinbarung gem. Art. 15a B-VG">Vereinbarung gem. Art. 15a B-VG</option>
            </select> 
          </div>
          <div className="optionZeile">
            <p>§/Artikel/Anlage:</p>
            <select id="landesrechtParagraphArtAnlTyp" value={values.landesrechtParagraphArtAnlTyp} onChange={handleChange}>
              <option value="">Alle</option>
              <option value="Paragraph">§</option>
              <option value="Artikel">Artikel</option>
              <option value="Anlage">Anlage</option>
            </select>
            <input id="landesrechtParagraphArtAnlNummer" value={values.landesrechtParagraphArtAnlNummer} onChange={handleChange} />
          </div>
        </div>
      </div>
    );
  }
}

class RechtsquellenItemVfgh extends Component {
  render() {
    const { values, handleSelection, handleChange } = this.props;

    return (
      <div className="rechtsquellenItemsContainer">
        <div id="vfgh" className="rechtsquellenItemsHeader" onClick={handleSelection}>
          <input type="checkbox" id="vfghCheckbox" value="vfgh" />
          <p>Verfassungsgerichtshof</p>
        </div>
        <div id="vfghOptionen" className="optionenContainer">
          <div className="optionZeile">
            <p>Geschäftszahl:</p>
            <input id="vfghGeschaeftszahl" value={values.vfghGeschaeftszahl} onChange={handleChange} /><br />
          </div>
          <div className="optionZeile">
            <p>Entscheidungsart:</p>
            <select id="vfghEntscheidungsart" value={values.vfghEntscheidungsart} onChange={handleChange}>
              <option value="">Alle</option>
              <option value="Beschluss">Beschluss</option>
              <option value="Erkenntnis">Erkenntnis</option>
              <option value="Vergleich">Vergleich</option>
            </select> 
          </div>
          <div className="optionZeile">
            <p>Dokumenttyp:</p>
            <select id="vfghDokumenttyp" value={values.vfghDokumenttyp} onChange={handleChange}>
              <option value="">Alle</option>
              <option value="Rechtssatz">Rechtssatz</option>
              <option value="Entscheidungstext">Entscheidungstext</option>
            </select> 
          </div>
        </div>
     </div>
    );
  }
}

class RechtsquellenItemVwgh extends Component {
  render() {
    const { values, handleSelection, handleChange } = this.props;

    return (
      <div className="rechtsquellenItemsContainer">
        <div id="vwgh" className="rechtsquellenItemsHeader" onClick={handleSelection}>
          <input type="checkbox" id="vwghCheckbox" value="vwgh" />
          <p>Verwaltungsgerichtshof</p>
        </div>
        <div id="vwghOptionen" className="optionenContainer">
          <div className="optionZeile">
            <p>Geschäftszahl:</p>
            <input id="vwghGeschaeftszahl" value={values.vwghGeschaeftszahl} onChange={handleChange} /><br />
          </div>
          <div className="optionZeile">
            <p>Entscheidungsart:</p>
            <select id="vwghEntscheidungsart" value={values.vwghEntscheidungsart} onChange={handleChange}>
              <option value="">Alle</option>
              <option value="Beschluss">Beschluss</option>
              <option value="Erkenntnis">Erkenntnis</option>
            </select> 
          </div>
          <div className="optionZeile">
            <p>Dokumenttyp:</p>
            <select id="vwghDokumenttyp" value={values.vwghDokumenttyp} onChange={handleChange}>
              <option value="">Alle</option>
              <option value="Rechtssatz">Rechtssatz</option>
              <option value="Entscheidungstext">Entscheidungstext</option>
            </select> 
          </div>
        </div>
      </div>
    );
  }
}

// includes the following sources: OGH, 9x OLG (Oberlandesgericht), etc.
class RechtsquellenItemJustiz extends Component {
  render() {
    const { values, handleSelection, handleChange } = this.props;

    return (
      <div className="rechtsquellenItemsContainer">
        <div id="justiz" className="rechtsquellenItemsHeader" onClick={handleSelection}>
          <input type="checkbox" id="justizCheckbox" value="vwgh" />
          <p>Justiz (OGH, OLG, etc.)</p>
        </div>
        <div id="justizOptionen" className="optionenContainer">
          <div className="optionZeile">
            <p>Gericht:</p>
            <input id="justizGerichtstyp" value={values.justizGerichtstyp} onChange={handleChange} /><br />
          </div>
          <div className="optionZeile">
            <p>Geschäftszahl:</p>
            <input id="justizGeschaeftszahl" value={values.justizGeschaeftszahl} onChange={handleChange} /><br />
          </div>
          <div className="optionZeile">
            <p>Dokumenttyp:</p>
            <select id="justizDokumenttyp" value={values.justizDokumenttyp} onChange={handleChange}>
              <option value="">Alle</option>
              <option value="Rechtssatz">Rechtssatz</option>
              <option value="Entscheidungstext">Entscheidungstext</option>
            </select> 
          </div>
        </div>
      </div>
    );
  }
}

export { RechtsquellenItemBundesrecht, RechtsquellenItemLandesrecht,
         RechtsquellenItemVfgh, RechtsquellenItemVwgh, RechtsquellenItemJustiz };