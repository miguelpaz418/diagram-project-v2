import React, { Component } from "react";
import PropTypes from "prop-types";
//React flow diagram
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig,
  diagramOn
} from "react-flow-diagram";
//Components
import { config, customEntities } from "./config-diagram";
//MUI
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab";
//Icons
import SaveIcon from "@material-ui/icons/Save";
//Redux
import { saveDiagram } from "../../../redux/actions/dataActions";
import { connect } from "react-redux";

const styles = theme => ({
  diagram: {
    flexGrow: 1
  },
  diagramContainer: {
    "@media (min-width: 1000px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "32rem",
      maxHeight: "32rem",
      minWidth: "50rem",
      maxWidth: "50rem"
    },
    "@media (min-width: 1200px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "48rem",
      maxHeight: "48rem",
      minWidth: "56rem",
      maxWidth: "56rem"
    },
    "@media (min-width: 1600px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "41rem",
      maxHeight: "41rem",
      minWidth: "65.5rem",
      maxWidth: "65.5rem"
    },
    "@media (min-width: 1920px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "62rem",
      maxHeight: "62rem",
      minWidth: "70rem",
      maxWidth: "70rem"
    }
  },
  buttonSave: {
    "@media (min-width: 1000px)": {
      position: "absolute",
      bottom: "1.5rem",
      right: "1.5rem"
    },
    "@media (min-width: 1200px)": {
      position: "absolute",
      bottom: "2.8rem",
      right: "3.8rem"
    },
    "@media (min-width: 1600px)": {
      position: "absolute",
      bottom: "2rem",
      right: "7rem"
    },
    "@media (min-width: 1920px)": {
      position: "absolute",
      bottom: "2rem",
      right: "14rem"
    }
  }
});

class ObjectDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagram: this.props.diagram
    };
    this._isMounted = false;
  }

  handleSubmit = e => {
    e.preventDefault();
    const updateDiagram = JSON.stringify(this.state.diagram);
    const diagram = {
      diagram: updateDiagram
    };
    const projectId = this.props.projectId;
    const diagramId = this.props.diagramId;
    this.props.saveDiagram(diagram, diagramId, projectId);
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && diagramStore.dispatch(setConfig(config));
    this._isMounted && diagramStore.dispatch(setEntities(this.state.diagram));
    this._isMounted &&
      diagramOn("anyChange", entityState => {
        this.setState({
          diagram: entityState
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
    diagramStore.dispatch(setEntities([]));
  }

  render() {
    const {
      classes,
      user: {
        authenticated,
        credentials: { userId }
      },
      diagramUserId
    } = this.props;

    return (
      <>
        <div className={classes.diagram}>
          <CssBaseline />
          <div className={classes.diagramContainer}>
            <Diagram customEntities={customEntities} />
            {authenticated && diagramUserId === userId ? (
              <Fab
                title="guardar diagrama"
                color="primary"
                aria-label="Save"
                size="medium"
                onClick={this.handleSubmit}
                className={classes.buttonSave}
              >
                <SaveIcon />
              </Fab>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

ObjectDiagram.propTypes = {
  saveDiagram: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { saveDiagram }
)(withStyles(styles)(ObjectDiagram));
