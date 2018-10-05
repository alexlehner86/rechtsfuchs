import React, { Component } from 'react';

class ShowInProgressAnimation extends Component {
  
  render() {
    return (
      <div className="progressAniBox">
        <img src="./icons/in-progress.gif" className="progressAniCenter" alt="" />             
      </div>
    )
  }
}

export { ShowInProgressAnimation };