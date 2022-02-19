import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/logoSolo.svg";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
//Icons
import { Google } from "mdi-material-ui";
//Redux
import { connect } from "react-redux";
import { loginUser, signupUserWhitGoogle } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.formTheme,
  biscuaIcon: {
    height: "100px"
  },
  loginFooter: {
    margin: 0,
    padding: 20,
    backgroundColor: "rgb(245, 245, 245)",
    width: "100%"
  },
  loginBody: {
    margin: 0,
    padding: "20px 20px 10px 20px"
  },
  buttonFooter: {
    margin: "10px auto 10px auto",
    position: "relative"
  }
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  responseGoogle = response => {
    const newUser = {
      idToken: response.accessToken,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      imageUrl: response.profileObj.imageUrl,
      email: response.profileObj.email
    };
    this.props.signupUserWhitGoogle(newUser, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      ui: { loading, loadingGoogle },
      authenticated
    } = this.props;
    if (authenticated) return <Redirect to="/dashboard" />;
    const { errors } = this.state;
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        item
        xs={12}
        sm={6}
        lg={4}
        alignItems="center"
        justifyContent="center"
        className={classes.form}
      >
        <Grid className={classes.loginBody}>
          <img src={AppIcon} alt="Icon" className={classes.biscuaIcon} />
          <GoogleLogin
            clientId="53857894416-70qv3d11ver7ngtmglhn6ph40fus5k08.apps.googleusercontent.com"
            buttonText="Ingresar con Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={renderProps => (
              <Button
                type="submit"
                variant="contained"
                className={classes.googleButton}
                disabled={loadingGoogle}
                onClick={renderProps.onClick}
                fullWidth
                size="medium"
              >
                <Google className={classes.iconGoogle} /> Inicia sesión con
                Google
                {loadingGoogle && (
                  <CircularProgress
                    size={30}
                    className={classes.progress}
                    color="secondary"
                  />
                )}
              </Button>
            )}
          />
          <form noValidate onSubmit={this.handleSubmit}>
            <Divider variant="fullWidth" className={classes.divider} />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
              fullWidth
              size="medium"
            >
              Inicia sesión
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
          </form>
          <Link to="/resetPassword" className={classes.link}>
            {" "}
            <Typography variant="body2">¿Olvidaste tu contraseña?</Typography>
          </Link>
        </Grid>
        <Grid className={classes.loginFooter}>
          <Typography variant="body2">
            ¿Aun no tienes una cuenta en BISCUA?
          </Typography>
          <Link to="/signup" className={classes.link}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              fullWidth
              size="medium"
            >
              Regístrate
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  signupUserWhitGoogle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {
  loginUser,
  signupUserWhitGoogle
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
