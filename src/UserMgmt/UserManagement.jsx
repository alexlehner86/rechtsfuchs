// ---------------------------------------------------------------------------
//  The UserManagement component renders different overlays that allow the user
//  to register a user account, login and delete their user account
// ---------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login, Register, RegisterWasSuccessful, DeleteUserAndProjects } from './components';
import { ShowAlertMessage } from './components';

class UserManagement extends Component {

  render() {
   // the redux store object "alertUserMgmt" serves two functions:
   // 1) its parameter "overlaytoDisplay" defines, which overlay component (e.g. Login) to show
   // 2) it contains error messages that can result from user management operations
   const { type, message, overlayToDisplay } = this.props.alertUserMgmt;
   
   if (overlayToDisplay !== 'Clear') {
     return (
          <div className="overlayContainer">
            <div className="overlayWhiteBox">
              {message && (
                <ShowAlertMessage type={type} message={message} />
              )}
              {overlayToDisplay === 'Login' && <Login />}
              {overlayToDisplay === 'Register' && <Register />}
              {overlayToDisplay === 'RegisterWasSuccessful' && <RegisterWasSuccessful />}
              {overlayToDisplay === 'DeleteUser' && <DeleteUserAndProjects />}
            </div>
          </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  const { alertUserMgmt } = state;
  return {
    alertUserMgmt
  };
}

const connectedUserManagement = connect(mapStateToProps)(UserManagement);
export { connectedUserManagement as UserManagement }; 
