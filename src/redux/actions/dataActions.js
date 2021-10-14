import {
  SET_PROJECTS,
  SET_PROJECT,
  LOADING_DATA,
  DELETE_PROJECT,
  LOADING_UI,
  CREATE_PROJECT,
  SET_ERRORS,
  CLEAR_ERRORS,
  GET_OBSERVERS,
  CREATE_DIAGRAM,
  DELETE_DIAGRAM,
  SET_DIAGRAM,
  SUBMIT_COMMENT,
  GET_ATTRIBUTES
} from "../types";
import axios from "axios";

//Get all projects
export const getProjects = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/projects")
    .then(response => {
      dispatch({
        type: SET_PROJECTS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_PROJECTS,
        payload: []
      });
    });
};

//Get data to one project
export const getProjectData = projectId => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/project/${projectId}`)
    .then(response => {
      dispatch({
        type: SET_PROJECT,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//Get data to one project
export const getDiagramData = diagramId => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/diagram/${diagramId}`)
    .then(response => {
      dispatch({
        type: SET_DIAGRAM,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//Delete one project
export const deleteProject = projectId => dispatch => {
  axios
    .delete(`/project/${projectId}`)
    .then(() => {
      dispatch({ type: DELETE_PROJECT, payload: projectId });
    })
    .catch(err => {
      console.log(err);
    });
};

//Create one Project
export const createProject = newProject => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/project", newProject)
    .then(response => {
      dispatch({
        type: CREATE_PROJECT,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      console.log(err);
    });
};

//Get observers
export const getObservers = () => dispatch => {
  axios
    .get("/observers")
    .then(response => {
      dispatch({
        type: GET_OBSERVERS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_OBSERVERS,
        payload: []
      });
    });
};

//Edit project details
export const editProjectDetails = projectDetails => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/project/edit", projectDetails)
    .then(() => {
      dispatch(getProjectData(projectDetails.projectId));
    })
    .catch(err => console.log(err));
};

//Clear errors
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

//Create one Diagram
export const createDiagram = (projectId, newDiagram) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/project/${projectId}/diagram`, newDiagram)
    .then(response => {
      dispatch({
        type: CREATE_DIAGRAM,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      console.log(err);
    });
};

//Delete one diagram
export const deleteDiagram = (diagramId, projectId) => dispatch => {
  axios
    .delete(`/project/${projectId}/diagram/${diagramId}`)
    .then(() => {
      dispatch({ type: DELETE_DIAGRAM, payload: diagramId });
    })
    .catch(err => {
      console.log(err);
    });
};

//Save diagram
export const saveDiagram = (diagram, diagramId, projectId) => dispatch => {
  axios
    .post(`/project/${projectId}/diagram/${diagramId}`, diagram)
    .then(() => {
      dispatch(getDiagramData(diagramId));
    })
    .catch(err => console.log(err));
};

//Submit comment
export const submitComment = (
  diagramId,
  projectId,
  commentData
) => dispatch => {
  axios
    .post(`/project/${projectId}/diagram/${diagramId}/comment`, commentData)
    .then(response => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};


//Get attributes for select
export const getAttributes = () => dispatch => {
  axios
    .get("/attributes")
    .then(response => {
      dispatch({
        type: GET_ATTRIBUTES,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ATTRIBUTES,
        payload: []
      });
    });
};
