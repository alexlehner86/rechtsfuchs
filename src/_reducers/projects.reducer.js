import { projectConstants } from '../_constants';

export function projects(state = {}, action) {
  let newList;

  switch (action.type) {
    case projectConstants.GETPROJECTS_BYUSERNAME_REQUEST:
      return { 
        loadingProjects: true,
        username: action.username
      };
    case projectConstants.GETPROJECTS_BYUSERNAME_SUCCESS:
      return {
        listOfRIS_Projects: action.listOfRIS_Projects
      };
    case projectConstants.GETPROJECTS_BYUSERNAME_FAILURE:
      return { 
        error: action.error
      };

    case projectConstants.SELECT_PROJECT:
      return {
        ...state,
        projectIsSelected: true,
        selectedProjectID: action.selectedProjectID
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
      newList = state.listOfRIS_Projects;
      newList.updateProject(action.updatedProject);
      newList.sortProjects();
      return {
        listOfRIS_Projects: newList,
        projectIsSelected: true,
        selectedProjectID: state.selectedProjectID,
        editingProject: false
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
      newList = state.listOfRIS_Projects;
      newList.deleteProject(action.id);
      return {
        listOfRIS_Projects: newList,
        projectIsSelected: false
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
      //...empty the stored listOfRIS_Projects as well
      return { };
    case projectConstants.DEL_PROJECTS_BYUSERNAME_FAILURE: 
      return { 
        ...state,
        error: action.error
      };

    default:
      return state
  }
}