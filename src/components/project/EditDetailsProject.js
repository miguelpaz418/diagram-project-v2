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
//Redux
import { connect } from "react-redux";
import { editProjectDetails } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.formTheme,
  buttonEdit: {
    float: "right"
  }
});

class EditDetailsProject extends Component {
  state = {
    title: "",
    description: "",
    objective: "",
    open: false
  };
  mapProjectDetailsToState = project => {
    this.setState({
      title: project.title ? project.title : "",
      description: project.description ? project.description : "",
      objective: project.objective ? project.objective : "",
      projectId: project.projectId
    });
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
    this.mapProjectDetailsToState(this.props.project);
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
    const projectDetails = {
      title: this.state.title,
      objective: this.state.objective,
      description: this.state.description,
      projectId: this.state.projectId
    };
    if (
      projectDetails.title === "" &&
      projectDetails.objective === "" &&
      projectDetails.description === ""
    ) {
      this.handleCLose();
    } else {
      this.props.editProjectDetails(projectDetails);
      this.handleCLose();
    }
  };
  componentDidMount() {
    const { project } = this.props;
    this.mapProjectDetailsToState(project);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.button}
          onClick={this.handleOpen}
        >
          Editar
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleCLose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Editar datos del proyecto</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="title"
                type="text"
                label="Título"
                placeholder="Ingresa el título del proyecto"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                name="objective"
                type="text"
                label="Objetivo"
                placeholder="Ingresa el Objetivo"
                className={classes.textField}
                value={this.state.objective}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                name="description"
                type="text"
                multiline
                rows="2"
                label="Descripción"
                placeholder="Ingresa una descripción"
                className={classes.textField}
                value={this.state.description}
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
              className={classes.buttonEdit}
            >
              Cancelar
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
              size="medium"
              className={classes.buttonEdit}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditDetailsProject.propTypes = {
  editProjectDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.data.project
});

export default connect(
  mapStateToProps,
  { editProjectDetails }
)(withStyles(styles)(EditDetailsProject));
