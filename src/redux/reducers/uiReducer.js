import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_UI_GOOGLE,
  SEND_MAIL
} from "../types";

const initialState = {
  loading: false,
  loadingGoogle: false,
  errors: null,
  send: false,
  message: null
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
    default:
      return state;
  }
}
