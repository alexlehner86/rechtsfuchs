import React, { Component } from 'react';

class BackgroundLogo extends Component {
  render() {
    return (
      <div className="logoDIV">
        <div className="logoCenteringDIV">
          <img src="./logo.svg" alt="" className="logoCentered" />
        </div>
      </div>
    );
  }
}

export { BackgroundLogo };