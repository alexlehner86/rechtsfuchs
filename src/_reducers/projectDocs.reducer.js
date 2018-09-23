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

    case projectDocConstants.ADD_SEARCHRESULT_ITEM_FOR_NEW_PROJECTDOC:
      return {
        ...state,
        risSearchResultItem: action.risSearchResultItem
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

    case projectDocConstants.SELECT_PROJECTDOC:
      return {
        ...state,
        selectedProjectDocID: action.selectedProjectDocID
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
        deleting: true
      };
    case projectDocConstants.DELETE_PROJECTDOC_SUCCESS:
      return {
        items: state.items.filter(projectDoc => projectDoc.id !== action.id)
      };
    case projectDocConstants.DELETE_PROJECT_FAILURE: 
      return { 
        ...state,
        error: action.error,
        deleting: false
      };

    default:
      return state
  }
}