// ---------------------------------------------------------------------------
//  The UserManagement component renders different overlays that allow the user
//  to register a user account, login and delete their user account
// ---------------------------------------------------------------------------


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginPage, RegisterPage, UserDeletePage } from './Pages';

class UserManagement extends Component {

  render() {
   // the redux store object "alertUserMgmt" serves to functions:
   // 1) its parameter "overlaytoDisplay" defines, which overlay (e.g. LoginPage) to show
   // 2) it contains error messages that can result from user management operations
   const { alertUserMgmt } = this.props;
   
   if (alertUserMgmt.overlayToDisplay !== 'Clear')
     return (
          <div className="overlayContainer">
            <div className="overlayWhiteBox">
              {alertUserMgmt.message &&
                <div className={`alert ${alertUserMgmt.type}`}>{alertUserMgmt.message}</div>
              }
              {alertUserMgmt.overlayToDisplay === 'Login' && <LoginPage />}
              {alertUserMgmt.overlayToDisplay === 'Register' && <RegisterPage />}
              {alertUserMgmt.overlayToDisplay === 'DeleteUser' && <UserDeletePage />}
            </div>
          </div>
      );
    else return null;
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
