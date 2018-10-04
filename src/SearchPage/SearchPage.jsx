// ---------------------------------------------------------------------------
//  The SearchPage component is rendered in the main section of the website.
//  It displays a simplified search form (SearchForm component), with which the user
//  can search the Legal Information System of the Republic of Austria (RIS).
//  The search results are displayed by the SearchResults components.
// ---------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import { BackgroundLogo } from './components';

import './SearchPage.css';
import './SearchResults.css';
import './SearchForm.css';
import 'rc-datepicker/lib/style.css';

class SearchPage extends Component {

  render() {
    const { searchRIS_Bundesrecht, searchRIS_Landesrecht, searchRIS_VwGH, searchRIS_VfGH } = this.props;

    return (
      <div className="Search-Grid">
        <div id="Search-Form" className="Search-Left">
          <div className="pufferBox"></div>
          <SearchForm />
        </div>
        <div id="Search-Results" className="Search-Right">
          <div className="pufferBoxRight"></div>
          { this.noSearchHasBeenInitiated() && <BackgroundLogo /> }
          { searchRIS_Bundesrecht.searchQuery && <SearchResults searchRIS_Data={searchRIS_Bundesrecht} /> }
          { searchRIS_Landesrecht.searchQuery && <SearchResults searchRIS_Data={searchRIS_Landesrecht} /> }
          { searchRIS_VfGH.searchQuery && <SearchResults searchRIS_Data={searchRIS_VfGH} /> }
          { searchRIS_VwGH.searchQuery && <SearchResults searchRIS_Data={searchRIS_VwGH} /> }
        </div>
      </div>
    );
  }

  noSearchHasBeenInitiated() {
    const { searchRIS_Bundesrecht, searchRIS_Landesrecht, searchRIS_VwGH, searchRIS_VfGH } = this.props;

    return !searchRIS_Bundesrecht.searchQuery && 
           !searchRIS_Landesrecht.searchQuery && 
           !searchRIS_VwGH.searchQuery && !searchRIS_VfGH.searchQuery; 

  }
}

function mapStateToProps(state) {
  const { searchRIS_Bundesrecht, searchRIS_Landesrecht, searchRIS_VwGH, searchRIS_VfGH } = state;
  return {
    searchRIS_Bundesrecht,
    searchRIS_Landesrecht,
    searchRIS_VwGH,
    searchRIS_VfGH
  };
}

const connectedSearchPage = connect(mapStateToProps)(SearchPage);
export { connectedSearchPage as SearchPage };
