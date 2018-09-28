import React, { Component } from 'react';
import { datalistSuchworte } from '../helpers';
import 'moment/locale/de-at.js';
import { DatePickerInput } from 'rc-datepicker';

class SearchFormTopInputFields extends Component {
  render() {
    const { values, handleChange, setStateOfParent } = this.props;

    return (
      <div className="sharedInputFields">
        {datalistSuchworte}
        <p>Suchworte:</p>
        <input id="suchworte" list="Begriffe" value={values.suchworte} onChange={handleChange} />
        <p>Datum von:</p>
        <DatePickerInput 
            displayFormat='DD/MM/YYYY'
            returnFormat='YYYY-MM-DD'
            className='datumInputStyle'
            onChange={(jsDate, dateString) => setStateOfParent({ datumVon: dateString })}
            value={values.datumVon}
            showOnInputClick
            placeholder=''
            locale='de-at'
        /><br />
        <p>bis:</p>
        <DatePickerInput 
            displayFormat='DD/MM/YYYY'
            returnFormat='YYYY-MM-DD'
            className='datumInputStyle'
            onChange={(jsDate, dateString) => setStateOfParent({ datumBis: dateString })}
            value={values.datumBis}
            showOnInputClick
            placeholder=''
            locale='de-at'
        /><br />
      </div>
    );
  }
}

export { SearchFormTopInputFields };