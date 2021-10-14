import {
  SET_PROJECTS,
  SET_PROJECT,
  LOADING_DATA,
  DELETE_PROJECT,
  CREATE_PROJECT,
  CREATE_DIAGRAM,
  GET_OBSERVERS,
  DELETE_DIAGRAM,
  SET_DIAGRAM,
  SUBMIT_COMMENT,
  GET_ATTRIBUTES
} from "../types";

const initialState = {
  observers: [],
  projects: [],
  project: {},
  diagram: {},
  attributes: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      };
    case SET_DIAGRAM:
      return {
        ...state,
        diagram: action.payload,
        loading: false
      };
    case SET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case GET_OBSERVERS:
      return {
        ...state,
        observers: action.payload
      };
    case DELETE_PROJECT:
      let indexProject = state.projects.findIndex(
        project => project.projectId === action.payload
      );
      state.projects.splice(indexProject, 1);
      return {
        ...state
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    case CREATE_DIAGRAM:
      return {
        ...state,
        project: {
          ...state.project,
          diagrams: [action.payload, ...state.project.diagrams]
        }
      };
    case DELETE_DIAGRAM:
      let indexDiagram = state.project.diagrams.findIndex(
        diagram => diagram.diagramId === action.payload
      );
      state.project.diagrams.splice(indexDiagram, 1);
      return {
        ...state
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        diagram: {
          ...state.diagram,
          comments: [action.payload, ...state.diagram.comments]
        }
      };
    case GET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.payload
      };
    default:
      return state;
  }
}
