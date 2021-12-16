import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LOADING_UI_GOOGLE,
  SEND_MAIL,
  MARK_NOTIFICATIONS_READ,
  GET_NOTIFICATION,
  SET_FCM_TOKEN,
  SET_DIAGRAM_UPDATE,
  SET_COMMET_UPDATE,
  CREATE_PROJECT
} from "../types";
import axios from "axios";
import jwtDecode from "jwt-decode";
//firebase
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../firebase";


export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(response => {
      setAuthorizationHeader(response.data.token);
      dispatch(getUserData());
      dispatch(exitApp());
      dispatch(getTokenFCM());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(response => {
      setAuthorizationHeader(response.data.token);
      dispatch(getUserData());
      dispatch(exitApp());
      dispatch(getTokenFCM());
      //dispatch(getNotification());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUserWhitGoogle = (newUser, history) => dispatch => {
  dispatch({ type: LOADING_UI_GOOGLE });
  axios
    .post("/signup/google", newUser)
    .then(response => {
      setAuthorizationHeader(response.data.token);
      dispatch(getUserData());
      dispatch(exitApp());
      dispatch(getTokenFCM());
      //dispatch(getNotification());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(response => {
      dispatch({
        type: SET_USER,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};

let timeExit = "";

export const exitApp = () => dispatch => {
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    let time = decodedToken.exp * 1000 - Date.now();
    timeExit = setTimeout(() => {
      dispatch(logoutUser());
      alert("Inicia sesión nuevamente para continuar");
    }, time);
  }
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  clearTimeout(timeExit);
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

const setAuthorizationHeader = token => {
  const FBIdTolken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdTolken);
  axios.defaults.headers.common["Authorization"] = FBIdTolken;
};

export const passwordReset = userData => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/passwordReset", userData)
    .then(response => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SEND_MAIL,
        payload: response.data.message
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const markNotificationsRead = notificationsIds => dispatch => {
  axios
    .post("/notifications", notificationsIds)
    .then(response => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getTokenFCM = () => dispatch => {

  getToken(messaging, {vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY}).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...console.log("token:: ", currentToken)
        axios
        .post(`/fcm/token/`, {token: currentToken})
        .then(response => {

          dispatch({
            type: SET_FCM_TOKEN
          });
        })
        .catch(err => console.log(err));
      
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
  });
};

export const getNotification = () => dispatch => {

  onMessage(messaging, (payload) => {
      let type = payload.data.type
      dispatch(getNotifications())
      switch (type) {
        case 'modify':
          axios
            .get(`/diagram/${payload.data.id}`)
            .then(response => {
              dispatch({
                type: SET_DIAGRAM_UPDATE,
                payload: response.data
              });
            })
            .catch(err => {
              console.log(err);
            });
          break;
        case 'comment':
          axios
            .get(`/comment/${payload.data.id}`)
            .then(response => {
              dispatch({
                type: SET_COMMET_UPDATE,
                payload: response.data
              });
            })
            .catch(err => {
              console.log(err);
            });
          break;
        case 'observer':
          axios
            .get(`/project/${payload.data.id}`)
            .then(response => {
              dispatch({
                type: CREATE_PROJECT,
                payload: response.data
              });
            })
            .catch(err => {
              console.log(err);
            });
          break;
        default:
          console.log("default")
          break;
      }
  });

};

export const getNotifications = () => dispatch => {

  axios
    .get(`/notifications`)
    .then(response => {
      dispatch({
        type: GET_NOTIFICATION,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};
