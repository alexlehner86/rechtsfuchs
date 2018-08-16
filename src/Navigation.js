import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, alertActionsUserMgmt } from './_actions';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleNavChange = this.handleNavChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
  }
  
  handleNavChange(e) {
    const id = e.target.id;
    this.props.onChangeNavChoice(id);
  }

  handleLogin(e) {
    //Login-Overlay anzeigen
    const { dispatch } = this.props;
    dispatch(alertActionsUserMgmt.clearAndOverlayChange('Login'));
  }

  handleLogout(e) {
    //Logout veranlassen
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }

  handleUserDelete(e) {
    //Delete-User-Overlay anzeigen
    const { dispatch } = this.props;
    dispatch(alertActionsUserMgmt.clearAndOverlayChange('DeleteUser'));
  }

  render() {
    const { user, loggedIn } = this.props;
    let buttonTitle = '';
    //Überprüfen, ob Nutzer bereits eingeloggt ist
    if (loggedIn) buttonTitle = `Hallo ${user.firstName}!`;

    return (
           <div className="navDIV">
            <p id="Start" onClick={this.handleNavChange}>Home</p>
            <p id="Suche" onClick={this.handleNavChange}>Suche</p>
            <p id="Projekte" onClick={this.handleNavChange}>Projekte</p>
            <p id="Info" onClick={this.handleNavChange}>Info</p>&nbsp;
            {!loggedIn && (
              <Button id="Login" onClick={this.handleLogin} bsStyle="default" bsSize="xsmall">
                Login
              </Button>
            )}
            {loggedIn && (
              <DropdownButton title={buttonTitle} bsSize="xsmall" id="bg-nested-dropdown">
                <MenuItem eventKey="1" onClick={this.handleLogout}>Logout</MenuItem>
                <MenuItem eventKey="2" onClick={this.handleUserDelete}>Konto löschen</MenuItem>
              </DropdownButton>
            )}
          </div>
    );
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
