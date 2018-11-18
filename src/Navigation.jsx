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
    const welcomeMessage = loggedIn ? `Hallo, ${user.firstName}!` : '';

    return (
      <nav>
        <div className="navDIV">
          <Button id="Start" onClick={this.handleNavChange} bsStyle="link">Home</Button>
          <Button id="Suche" onClick={this.handleNavChange} bsStyle="link">Suche</Button>
          <Button id="Projekte" onClick={this.handleNavChange} bsStyle="link">Projekte</Button>
          
          {!loggedIn && (
            <Button id="Login" onClick={this.handleUserMgmtChange} bsStyle="link">
              Login
            </Button>
          )}
          {loggedIn && (
            <DropdownButton title="Konto" bsStyle="link" id="bg-nested-dropdown">
              <MenuItem header>{welcomeMessage}</MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              <MenuItem id="DeleteUser" onClick={this.handleUserMgmtChange}>Konto löschen</MenuItem>
            </DropdownButton>
          )}

          <Button id="Info" onClick={this.handleNavChange} bsStyle="link">Info</Button>
        </div>
      </nav>
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
