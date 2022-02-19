import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SendIcon from "../images/mailSend.svg";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux
import { connect } from "react-redux";
import { passwordReset } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.formTheme,
  sendIcon: {
    height: "200px"
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

class resetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {},
      send: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({
        errors: nextProps.ui.errors
      });
    }
    if (nextProps.ui.send) {
      this.setState({
        send: nextProps.ui.send
      });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading && !nextProps.ui.send) {
      this.setState({
        email: "",
        errors: {},
        send: false
      });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email
    };
    this.props.passwordReset(userData);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      ui: { loading }
    } = this.props;
    const { errors, send } = this.state;
    //console.log(this.state.send);
    //console.log(this.state.email);
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
        {!send && errors !== {} ? (
          <div>
            <Grid className={classes.loginBody}>
              <Typography variant="h5">¿Olvidaste tu contraseña?</Typography>
              <Typography variant="body1">
                Te enviaremos un enlace a tu correo para que puedas cambiar la
                contraseña
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
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
                  Cambiar mi contraseña
                  {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
                <br />
              </form>
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
          </div>
        ) : (
          <Grid className={classes.loginBody}>
            <Typography variant="h5">¿Olvidaste tu contraseña?</Typography>
            <Typography variant="body1">
              {`Hemos enviado a tu correo ${this.state.email} las instrucciones para
              cambiar tu contraseña.`}
            </Typography>
            <img src={SendIcon} alt="Icon" className={classes.sendIcon} />
          </Grid>
        )}
      </Grid>
    );
  }
}

resetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ui: state.ui
});

const mapActionsToProps = {
  passwordReset
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(resetPassword));
