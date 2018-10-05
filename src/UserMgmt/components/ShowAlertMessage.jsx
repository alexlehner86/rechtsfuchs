import React, { Component } from 'react';

class ShowAlertMessage extends Component {
  
  render() {
    const { type, message } = this.props;

    return <div className={`alert ${type}`}>{message}</div>;
  }
}

export { ShowAlertMessage };