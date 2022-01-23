import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_UI_GOOGLE,
  SEND_MAIL,
  SET_MODAL,
  CLEAR_MODAL
} from "../types";

const initialState = {
  loading: false,
  loadingGoogle: false,
  errors: null,
  send: false,
  message: null,
  modal: "",
  openModal: false,
  messageModal: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        send: false
      };
    case SEND_MAIL:
      return {
        ...state,
        send: true,
        message: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        loadingGoogle: false,
        errors: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case LOADING_UI_GOOGLE:
      return {
        ...state,
        loadingGoogle: true
      };
    case SET_MODAL:
      return {
        ...state,
        modal: action.payload.modal,
        openModal: true,
        messageModal: action.payload.message
      };
    case CLEAR_MODAL:
      return {
        ...state,
        modal: "",
        openModal: false,
        messageModal: ""
      };
    default:
      return state;
  }
}
