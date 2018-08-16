import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginPage, RegisterPage, UserDeletePage } from './Pages';

class UserManagement extends Component {

  render() {
   //alertUserMgmt definiert, ob Login oder Registrieren angezeigt wird
   //...und enthält Fehler- und Erfolgsmeldungen
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
