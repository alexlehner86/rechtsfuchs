import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchForm } from './SearchForm';
import {SearchResultsBundesrecht,
        SearchResultsLandesrecht,
        SearchResultsVwGH, 
        SearchResultsVfGH} from './SearchResults';

import './SearchPage.css';
import './SearchResults/SearchResults.css';
import './SearchForm.css';
import 'rc-datepicker/lib/style.css';

class SearchPage extends Component {

  render() {
    const { searchRIS_Bundesrecht, searchRIS_Landesrecht, searchRIS_VwGH, searchRIS_VfGH } = this.props;
    let showBackgroundLogo = false;
    //show background logo when no search has been initiated; e.g. after reset
    if (!searchRIS_Bundesrecht.searchQuery && !searchRIS_Landesrecht.searchQuery && 
        !searchRIS_VwGH.searchQuery && !searchRIS_VfGH.searchQuery) showBackgroundLogo = true;

    return (
      <div className="Search-Grid">
        {/* display left-side element: search form */}
        <div id="Search-Form" className="Search-Left">
          <div className="pufferBox"></div>
          <SearchForm />
        </div>
        {/* display right-side element: search results */} 
        <div id="Search-Results" className="Search-Right">
          <div className="pufferBox"></div>
          { showBackgroundLogo && (
               <div className="logoDIV">
                <div className="logoCenteringDIV">
                 <img src="./logo.svg" alt="" className="logoCentered" />
                </div>
               </div>
          )}
          { searchRIS_Bundesrecht.searchQuery && <SearchResultsBundesrecht /> }
          { searchRIS_Landesrecht.searchQuery && <SearchResultsLandesrecht /> }
          { searchRIS_VfGH.searchQuery && <SearchResultsVfGH /> }
          { searchRIS_VwGH.searchQuery && <SearchResultsVwGH /> }
        </div>
      </div>
    );
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
