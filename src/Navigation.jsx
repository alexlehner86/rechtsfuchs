import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, alertActionsUserMgmt } from './_actions';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleNavChange = this.handleNavChange.bind(this);
    this.handleUserMgmtChange = this.handleUserMgmtChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    const { user, loggedIn } = this.props;
    const buttonTitle = loggedIn ? `Hallo ${user.firstName}!` : '';

    return (
           <div className="navDIV">
            <p id="Start" onClick={this.handleNavChange}>Home</p>
            <p id="Suche" onClick={this.handleNavChange}>Suche</p>
            <p id="Projekte" onClick={this.handleNavChange}>Projekte</p>
            <p id="Info" onClick={this.handleNavChange}>Info</p>&nbsp;
            
            {!loggedIn && (
              <Button id="Login" onClick={this.handleUserMgmtChange} bsStyle="default" bsSize="xsmall">
                Login
              </Button>
            )}
            {loggedIn && (
              <DropdownButton title={buttonTitle} bsSize="xsmall" id="bg-nested-dropdown">
                <MenuItem eventKey="1" onClick={this.handleLogout}>Logout</MenuItem>
                <MenuItem id="DeleteUser" eventKey="2" onClick={this.handleUserMgmtChange}>Konto löschen</MenuItem>
              </DropdownButton>
            )}
          </div>
    );
  }

  handleNavChange(e) {
    this.props.onChangeNavChoice(e.target.id);
  }

  handleUserMgmtChange(e) {
    const { dispatch } = this.props;
    dispatch(alertActionsUserMgmt.clearAndOverlayChange(e.target.id));
  }

  handleLogout(e) {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }
}

function mapStateToProps(state) {
  const { alertUserMgmt } = state;
  const { user, loggedIn } = state.authentication;
  return {
      user,
      loggedIn,
      alertUserMgmt
  };
}

const connectedNavigation = connect(mapStateToProps)(Navigation);
export { connectedNavigation as Navigation };
