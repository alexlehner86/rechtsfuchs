import { projectConstants } from '../_constants';

export function projects(state = {}, action) {
  switch (action.type) {
    case projectConstants.GETPROJECTS_BYUSERNAME_SUCCESS:
      return {
        items: action.projects
      };
    case projectConstants.GETPROJECTS_BYUSERNAME_FAILURE:
      return { 
        items: [],
        error: action.error
      };

    case projectConstants.SELECT_PROJECT:
      return {
        ...state,
        selectedProject: action.selectedProject
      };

    case projectConstants.CREATE_PROJECT_REQUEST:
      return {
        ...state,
        creatingProject: true,
        projectToCreate: action.projectToCreate
      };
    case projectConstants.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        creatingProject: false
      };
    case projectConstants.CREATE_PROJECT_FAILURE: 
      return { 
        ...state,
        error: action.error,
        creatingProject: false
      };

    case projectConstants.UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        editingProject: true,
        projectToChange: action.projectToChange
      };
    case projectConstants.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        editingProject: false,
        items: state.items.map(project =>
          project.id === action.changedProject.id
            ? action.changedProject
            : project
        )
      };
    case projectConstants.UPDATE_PROJECT_FAILURE: 
      return { 
        ...state,
        error: action.error,
        editingProject: false
      };

    case projectConstants.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        projectToDeleteID: action.id,
        deleting: true
      };
    case projectConstants.DELETE_PROJECT_SUCCESS:
      return {
        items: state.items.filter(project => project.id !== action.id),
        selectedProject: undefined
      };
    case projectConstants.DELETE_PROJECT_FAILURE: 
      return { 
        ...state,
        error: action.error,
        deleting: false
      };

    case projectConstants.DEL_PROJECTS_BYUSERNAME_REQUEST:
      return {
        ...state,
        username: action.username
      };
    case projectConstants.DEL_PROJECTS_BYUSERNAME_SUCCESS:
      //when successfully deleted all projects in db...
      //...empty the stored project-items as well
      return {
        items: []
      };
    case projectConstants.DEL_PROJECTS_BYUSERNAME_FAILURE: 
      return { 
        ...state,
        error: action.error
      };

    default:
      return state
  }
}