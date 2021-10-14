import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from '@material-ui/core/styles'
import { generalTheme } from "./util/theme";
import jwtDecode from "jwt-decode";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
import Footer from "./components/layout/Footer";
//Pages
import dashboard from "./pages/dashboard";
import project from "./pages/project";
import login from "./pages/login";
import signup from "./pages/signup";
import home from "./pages/home";
import editDiagram from "./pages/editDiagram";
import resetPassword from "./pages/resetPassword";

const theme = createTheme(generalTheme);

axios.defaults.baseURL =
  "https://us-central1-bisqua-prueba.cloudfunctions.net/api";
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.reload();
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <CssBaseline />
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/resetPassword" component={resetPassword} />
                <AuthRoute exact path="/dashboard" component={dashboard} />
                <AuthRoute
                  exact
                  path="/project/:projectId"
                  component={project}
                />
                <AuthRoute
                  exact
                  path="/project/:projectId/diagram/:diagramId"
                  component={editDiagram}
                />
              </Switch>
            </div>
            <Footer />
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
