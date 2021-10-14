import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//Components
import CustomButton from "../../util/CustomButton";
import Observer from "./Observer";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
//Icons
import {
  BookmarkRemove,
  BookmarkCheck,
  PlusCircleOutline
} from "mdi-material-ui";
//Redux
import { connect } from "react-redux";
import {
  createProject,
  clearErrors,
  getObservers
} from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.formTheme,
  progressSpinner: {
    position: "absolute"
  },
  paperObservers: {
    display: "flex",
    //justifyContent: "center",
    flexWrap: "wrap",
    padding: "0.2rem",
    margin: "10px auto 10px auto"
  },
  chip: {
    margin: theme.spacing(1)
  },
  iconChip: {
    fontSize: 30
    //margin: 2
  },
  button: {
    float: "right"
  },
  colorIcon: {
    color: "#fff"
  },
  btnCreateProject: {
    marginLeft: "90%"
  }
});

class CreateProject extends Component {
  state = {
    title: "",
    description: "",
    objective: "",
    observers: [],
    dataObserver: [],
    search: "",
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
        title: "",
        description: "",
        objective: "",
        open: false,
        errors: {},
        dataObserver: [],
        observers: []
      });
    }
  }
  componentDidMount() {
    this.props.getObservers();
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
    const newProject = {
      title: this.state.title,
      description: this.state.description,
      objective: this.state.objective,
      observers: this.state.observers
    };
    this.props.createProject(newProject);
  };
  Remove = id => {
    const users = [];
    Object.assign(users, this.props.data.observers);
    const ids = this.state.observers;

    const dataSelected = ids.map(id => {
      return users.find(user => {
        return user.userId === id;
      });
    });
    const newDataSelected = dataSelected.filter(user => user.userId !== id);

    const newObservers = ids.filter(observer => observer !== id);

    const newData = [];
    Object.assign(newData, newDataSelected);

    this.setState({
      dataObserver: newData,
      observers: newObservers
    });
  };
  Add = id => {
    const users = [];
    Object.assign(users, this.props.data.observers);
    const user = users.filter(user => user.userId === id);
    const dataObserver = this.state.dataObserver;

    const auxObservers = this.state.observers;

    if (!auxObservers.includes(id) && id !== "") {
      auxObservers.push(id);
      dataObserver.push(user[0]);
    }
    this.setState({
      observers: auxObservers,
      dataObserver: dataObserver
    });
  };
  handleAddObserver = event => {
    this.Add(event.target.id);
  };
  handleRemoveObserver = event => {
    this.Remove(event.target.id);
  };
  onClickAddObserver = event => {
    this.Add(event.target.id);
  };
  onClickRemoveObserver = event => {
    this.Remove(event.target.id);
  };
  handleUpdateSearch = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      ui: { loading }
    } = this.props;
    //get the observers from data in redux
    const { observers } = this.props.data;
    //cont to filter the observer from the value of search
    let observersFiltered = observers.filter(observer => {
      return observer.email.indexOf(this.state.search) !== -1;
    });
    let observersSelected = this.state.dataObserver;
    return (
      <div>
        <CustomButton
          onClick={this.handleOpen}
          tip="Crear nuevo projecto"
          btnClassName={classes.btnCreateProject}
        >
          <PlusCircleOutline className={classes.colorIcon} />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleCLose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Crear Proyecto</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="title"
                type="text"
                label="Título"
                placeholder="Ingresa el título del proyecto"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
                error={errors.title ? true : false}
                helperText={errors.title}
              />
              <TextField
                name="objective"
                type="text"
                label="Objetivo"
                placeholder="Ingresa el objetivo del proyecto"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
                error={errors.objective ? true : false}
                helperText={errors.objective}
              />
              <TextField
                name="description"
                type="text"
                label="Descripción"
                multiline
                rows="2"
                placeholder="Ingresa una breve descripción del proyecto"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
                error={errors.description ? true : false}
                helperText={errors.description}
              />
              <Typography variant="body1">
                Observadores seleccionados
              </Typography>
              <Paper className={classes.paperObservers}>
                {observersSelected &&
                  observersSelected.map(observer => {
                    return (
                      <Observer
                        key={observer.userId}
                        email={observer.email}
                        imageUrl={observer.imageUrl}
                        onHandle={this.handleRemoveObserver}
                        onClick={this.onClickRemoveObserver}
                        chipClassName={classes.chip}
                        chipId={observer.userId}
                        icon={
                          <BookmarkRemove
                            id={observer.userId}
                            className={classes.iconChip}
                          />
                        }
                        color="secondary"
                        variant="outlined"
                      />
                    );
                  })}
              </Paper>
              <Typography variant="body1">Invitar Observadores</Typography>
              <Paper className={classes.paperObservers}>
                {observersFiltered &&
                  observersFiltered.slice(0, 2).map(observer => {
                    return (
                      <Observer
                        key={observer.userId}
                        email={observer.email}
                        imageUrl={observer.imageUrl}
                        onHandle={this.handleAddObserver}
                        onClick={this.onClickAddObserver}
                        chipClassName={classes.chip}
                        chipId={observer.userId}
                        icon={
                          <BookmarkCheck
                            id={observer.userId}
                            className={classes.iconChip}
                          />
                        }
                        color="primary"
                        variant="outlined"
                      />
                    );
                  })}
              </Paper>
              <TextField
                name="filter"
                type="text"
                label="Filtrar usuarios por email"
                placeholder="Ingresa el correo del observador"
                value={this.state.search}
                onChange={this.handleUpdateSearch}
                fullWidth
                className={classes.textField}
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

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  getObservers: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ui: state.ui,
  data: state.data
});

const mapActionsToProps = {
  createProject,
  clearErrors,
  getObservers
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CreateProject));
