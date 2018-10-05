import React, { Component } from 'react';

class FormInputFieldObligatory extends Component {
  render() {
    const { inputObject, inputType, submitted, label } = this.props;
    const inputName = Object.keys(inputObject)[0];
    const inputValue = inputObject[inputName];

    return (
      <div className={'form-group' + (submitted && !inputValue ? ' has-error' : '')}>
        <label htmlFor={inputName}>{label}</label>
        <input type={inputType} className="form-control" name={inputName} value={inputValue} onChange={this.props.handleChange} />
        {submitted && !inputValue &&
            <div className="help-block">Bitte {label} eingeben</div>
        }
      </div>
    );
  }
}

class FormInputFieldOptional extends Component {
  render() {
    const { inputObject, label } = this.props;
    const inputName = Object.keys(inputObject)[0];
    const inputValue = inputObject[inputName];

    return (
      <div className="form-group">
        <label htmlFor={inputName}>{label} <span className="smallLabelText">&nbsp;(optional)</span></label>
        <input type="text" className="form-control" name={inputName} value={inputValue} onChange={this.props.handleChange} />
      </div>
    );
  }
}

class FormTextareaObligatory extends Component {
  render() {
    const { inputObject, submitted, label } = this.props;
    const inputName = Object.keys(inputObject)[0];
    const inputValue = inputObject[inputName];

    return (
      <div className={'form-group' + (submitted && !inputValue ? ' has-error' : '')}>
        <label htmlFor={inputName}>{label}</label>
        <textarea className="form-control" rows="5" style={{resize: 'none'}}
                  name={inputName} value={inputValue} onChange={this.props.handleChange} />
        {submitted && !inputValue &&
            <div className="help-block">Bitte {label} eingeben</div>
        }
      </div>
    );
  }
}

class FormTextareaOptional extends Component {
  render() {
    const { inputObject, label } = this.props;
    const inputName = Object.keys(inputObject)[0];
    const inputValue = inputObject[inputName];

    return (
      <div className="form-group">
        <label htmlFor={inputName}>{label} <span className="smallLabelText">&nbsp;(optional)</span></label>
        <textarea className="form-control" rows="5" style={{resize: 'none'}}
                  name={inputName} value={inputValue} onChange={this.props.handleChange} />
      </div>
    );
  }
}

export { FormInputFieldObligatory, FormInputFieldOptional, FormTextareaObligatory, FormTextareaOptional };