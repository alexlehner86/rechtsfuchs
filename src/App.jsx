// ---------------------------------------------------------------------------
//  The App-File renders the whole website, using react components as well as
//  data from the redux store (which is provided via the connect function)
// ---------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectActions, alertActionsUserMgmt, alertActionsProjectMgmt } from './_actions';
import { HomePage } from './HomePage';
import { UserManagement } from './UserMgmt';
import { ProjectManagement } from './ProjectMgmt';
import { Navigation } from './Navigation.jsx';
import { SearchPage } from './SearchPage';
import { ProjectsPage } from './ProjectsPage';
import { InfoPage } from './InfoPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const { user, dispatch } = this.props;

    // if user is logged in, load the user's projects from the database
    if (user) dispatch(projectActions.getAllByUsername(user.username));

    // the user management und project management overlays are hidden (=clear) at the beginning
    dispatch(alertActionsUserMgmt.clearAndOverlayChange('Clear'));
    dispatch(alertActionsProjectMgmt.clearAndOverlayChange('Clear'));

    // setup for the page navigation, which is handled via the component's state
    this.changeNavChoice = this.changeNavChoice.bind(this);
    this.state = {
      navChoice: 'Start'  // at the start the website is rendered with the HomePage component
    };
  }
  
  render() {
    const { navChoice }  = this.state;

    return (
      <div className="App">

        {/* UserManagement & ProjectManagement with overlays; default: hidden */}
        <UserManagement />
        <ProjectManagement />

        <Navigation onChangeNavChoice={this.changeNavChoice} />
        
        {/* App-main contains the main elements of the website, e.g. RIS search, projects */}
        <main>
          {navChoice === 'Start' && <HomePage />}
          {navChoice === 'Suche' && <SearchPage />}
          {navChoice === 'Projekte' && <ProjectsPage />}
          {navChoice === 'Info' && <InfoPage />}
        </main>

        <footer>
          <p>&copy; Rechtsfuchs</p>
        </footer>
      </div>
    );
  }

  changeNavChoice(newNavChoice) {
    this.setState( { navChoice: newNavChoice });
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