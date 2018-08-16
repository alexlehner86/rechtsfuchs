import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { projects } from './projects.reducer';
import { projectDocs } from './projectDocs.reducer';
import { searchRIS_Bundesrecht, searchRIS_Landesrecht, searchRIS_VwGH, searchRIS_VfGH } from './searchRIS.reducer';
import { alertUserMgmt, alertSearchForm, alertProjectMgmt } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  projects,
  projectDocs,
  searchRIS_Bundesrecht,
  searchRIS_Landesrecht,
  searchRIS_VwGH,
  searchRIS_VfGH,
  alertUserMgmt,
  alertSearchForm,
  alertProjectMgmt
});

export default rootReducer;