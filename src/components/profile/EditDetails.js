import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
//Redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

const styles = theme => ({
  ...theme.formTheme,
  button: {
    float: "right"
  }
});

class EditDetails extends Component {
  state = {
    bio: "",
    location: "",
    profession: "",
    firstName: "",
    lastName: "",
    open: false
  };
  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      location: credentials.location ? credentials.location : "",
      profession: credentials.profession ? credentials.profession : "",
      firstName: credentials.firstName ? credentials.firstName : "",
      lastName: credentials.lastName ? credentials.lastName : ""
    });
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleCLose = () => {
    this.setState({
      open: false
    });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    const userDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      bio: this.state.bio,
      profession: this.state.profession,
      location: this.state.location
    };
    if (
      userDetails.bio === "" &&
      userDetails.profession === "" &&
      userDetails.location === "" &&
      userDetails.lastName === "" &&
      userDetails.firstName === ""
    ) {
      this.handleCLose();
    } else {
      this.props.editUserDetails(userDetails);
      this.handleCLose();
    }
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  render() {
    const { classes } = this.props;
    const professions = [
      { value: "Ingeniero de Sistemas", label: "Ingeniero de Sistemas" },
      { value: "Diseñador", label: "Diseñador" },
      { value: "Electrónico", label: "Electrónico" }
    ];
    return (
      <div>
        <div onClick={this.handleOpen}>Editar perfil</div>
        <Dialog
          open={this.state.open}
          onClose={this.handleCLose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="firstName"
                type="text"
                label="Nombre"
                placeholder="Ingresa tu Nombre"
                className={classes.textField}
                value={this.state.firstName}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                name="lastName"
                type="text"
                label="Apellido"
                placeholder="Ingresa tu Apellido"
                className={classes.textField}
                value={this.state.lastName}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                id="profession"
                name="profession"
                select
                label="Seleccione su profesión"
                className={classes.textField}
                value={this.state.profession}
                onChange={this.handleChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                fullWidth
                variant="outlined"
              >
                {professions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="location"
                type="text"
                label="Ubicación"
                placeholder="Ingresa tu ubicación actual"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                name="bio"
                type="text"
                label="Biografia"
                multiline
                rows="2"
                placeholder="Algo corto acerca de tí"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCLose}
              variant="contained"
              color="secondary"
              size="medium"
              className={classes.button}
            >
              Cancelar
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
              size="medium"
              className={classes.button}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
