import { projectDocConstants } from '../_constants';

export function projectDocs(state = {}, action) {
  switch (action.type) {
    case projectDocConstants.GETPROJECTDOCS_BYPROJECTID_REQUEST:
      return {
        loadingDocs: true
      };
    case projectDocConstants.GETPROJECTDOCS_BYPROJECTID_SUCCESS:
      return {
        items: action.projectDocs
      };
    case projectDocConstants.GETPROJECTDOCS_BYPROJECTID_FAILURE:
      return { 
        error: action.error
      };

    case projectDocConstants.CREATE_PROJECTDOC_REQUEST:
      return {
        ...state,
        creatingProjectDoc: true,
        projectDocToCreate: action.projectDocToCreate
      };
    case projectDocConstants.CREATE_PROJECTDOC_SUCCESS:
      return {
        ...state,
        creatingProjectDoc: false
      };
    case projectDocConstants.CREATE_PROJECTDOC_FAILURE: 
      return { 
        ...state,
        error: action.error,
        creatingProjectDoc: false
      };

    case projectDocConstants.UPDATE_PROJECTDOC_REQUEST:
      return {
        ...state,
        editingProjectDoc: true,
        projectDocToChange: action.projectDocToChange
      };
    case projectDocConstants.UPDATE_PROJECTDOC_SUCCESS:
      return {
        ...state,
        editingProjectDoc: false,
        items: state.items.map(projectDoc =>
          projectDoc.id === action.changedProjectDoc.id
            ? action.changedProjectDoc
            : projectDoc
        )
      };
    case projectDocConstants.UPDATE_PROJECTDOC_FAILURE:
      return { 
        ...state,
        error: action.error,
        editingProjectDoc: false
      };

    case projectDocConstants.DELETE_PROJECTDOC_REQUEST:
      return {
        ...state,
        projectDocToDelete: action.projectDocToDelete,
        loadingDocs: true
      };
    case projectDocConstants.DELETE_PROJECTDOC_SUCCESS:
      return {
        items: state.items.filter(projectDoc => projectDoc.id !== action.id),
        loadingDocs: false
      };
    case projectDocConstants.DELETE_PROJECT_FAILURE: 
      return { 
        ...state,
        error: action.error,
        loadingDocs: false
      };

    default:
      return state
  }
}