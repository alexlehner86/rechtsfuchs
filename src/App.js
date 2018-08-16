import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectActions, alertActionsUserMgmt, alertActionsSearchForm,
         alertActionsProjectMgmt } from './_actions';

import { HomePage } from './HomePage';
import { UserManagement } from './UserMgmt';
import { ProjectManagement } from './ProjectMgmt';
import { Navigation } from './Navigation';
import { SearchPage } from './SearchPage';
import { ProjectsPage } from './ProjectsPage';
import { InfoPage } from './InfoPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const { user, dispatch } = this.props;

    // Projekte des Users laden, falls eingeloggt
    if (user) dispatch(projectActions.getAllByUsername(user.username));

    //User-Management- und Project-Management-Overlays sind zu Beginn versteckt (=Clear)
    dispatch(alertActionsUserMgmt.clearAndOverlayChange('Clear'));
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));

    //Setup für Menü-Navigation und Rechtsquellen-Auswahl auf Search-Page
    this.changeNavChoice = this.changeNavChoice.bind(this);
    this.state = {
      navChoice: 'Start'
    };
  }

  changeNavChoice(newNavChoice) {
    //Falls Wechsel zu "Suche", dann mögliche Such-Alerts löschen
    const { dispatch } = this.props;
    if (newNavChoice === 'Suche') dispatch(alertActionsSearchForm.clear());

    this.setState( {navChoice: newNavChoice });
  }
  
  render() {
    const { navChoice }  = this.state;

    return (
      <div className="App">

        {/* User- und Project-Management mit Overlays; default: hidden */}
        <UserManagement />
        <ProjectManagement />

        {/* Navigations-Menü */}
        <nav className="App-nav">
          <Navigation onChangeNavChoice={this.changeNavChoice} />
        </nav>
        
        {/* main-div, in welches ausgewählte Seite geladen wird */}
        <div className="App-main">
          {navChoice === 'Start' && <HomePage />}
          {navChoice === 'Suche' && <SearchPage />}
          {navChoice === 'Projekte' && <ProjectsPage />}
          {navChoice === 'Info' && <InfoPage />}
        </div>

        {/* Footer der Webseite */}
        <footer className="App-footer">
          <p>&copy; Rechtsfuchs</p>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };