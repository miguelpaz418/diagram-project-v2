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
  GET_ATTRIBUTES,
  SET_DIAGRAM_UPDATE,
  SET_COMMET_UPDATE,
  DELETE_OBJECT
} from "../types";

const initialState = {
  observers: [],
  projects: [],
  project: {},
  diagram: {},
  attributes: [],
  removed: [],
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
    case SET_DIAGRAM_UPDATE:
      let newDiagram = {}
      if(Object.keys(state.diagram).length === 0){
        return state;
      }else{
        newDiagram = state.diagram.diagramId === action.payload.diagramId ? action.payload : state.diagram
      }
      return {
        ...state,
        diagram: newDiagram
      };
    case SET_COMMET_UPDATE:
      return {
        ...state,
        diagram: {
          ...state.diagram,
          comments: [action.payload, ...state.diagram.comments]
        }
      };
    case DELETE_OBJECT:
      return {
        ...state,
        removed: [action.payload, ...state.removed]
      };
    default:
      return state;
  }
}
