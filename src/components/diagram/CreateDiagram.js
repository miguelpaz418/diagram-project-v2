import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//Components
import CustomButton from "../../util/CustomButton";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
//Icons
import { PlusCircleOutline } from "mdi-material-ui";
//Redux
import { connect } from "react-redux";
import { createDiagram, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.formTheme,
  progressSpinner: {
    position: "absolute"
  },
  button: {
    float: "right"
  },
  colorIcon: {
    color: "#FFFFFF"
  },
  btnCreateDiagram: {
    marginLeft: "90%"
  }
});

class CreateDiagram extends Component {
  state = {
    type: "",
    diagramName: "",
    open: false,
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({
        errors: nextProps.ui.errors
      });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({
        type: "",
        diagramName: "",
        open: false,
        errors: {}
      });
    }
  }
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleCLose = () => {
    this.props.clearErrors();
    this.setState({
      open: false,
      errors: {},
      dataObserver: []
    });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const newDiagram = {
      type: this.state.type,
      diagramName: this.state.diagramName,
      diagram: "[]"
    };
    this.props.createDiagram(this.props.projectId, newDiagram);
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      ui: { loading }
    } = this.props;
    const types = [
      { value: "1", label: "Objetos/Acciones" },
      { value: "2", label: "Interrelación/Reacción" },
      { value: "3", label: "Interacciones/Intra-acciones" }
    ];
    return (
      <div>
        <CustomButton
          onClick={this.handleOpen}
          tip="Crear nuevo diagrama"
          btnClassName={classes.btnCreateDiagram}
        >
          <PlusCircleOutline className={classes.colorIcon} />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleCLose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Crear Diagrama</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="diagramName"
                type="text"
                label="Nombre del diagrama"
                placeholder="Ingresa el nombre del diagrama"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
                error={errors.diagramName ? true : false}
                helperText={errors.diagramName}
              />
              <TextField
                name="type"
                select
                label="Seleccione un Tipo"
                className={classes.textField}
                value={this.state.type}
                onChange={this.handleChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                error={errors.type ? true : false}
                helperText={errors.type}
                fullWidth
                variant="outlined"
              >
                {types.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CreateDiagram.propTypes = {
  createDiagram: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ui: state.ui
});

const mapActionsToProps = {
  createDiagram,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CreateDiagram));
