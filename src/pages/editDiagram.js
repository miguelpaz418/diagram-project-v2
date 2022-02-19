import React, { Component } from "react";
import PropTypes from "prop-types";
//Components
import SkeletonComments from "../skeleton/SkeletonComments";
import SkeletonDiagram from "../skeleton/SkeletonDiagram";
import SkeletonName from "../skeleton/SkeletonName";
import Comments from "../components/diagram/Comments";
import CommentForm from "../components/diagram/CommentForm";
//NEW
import Graph from "../components/diagram/diagramJointjs/index"

//MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
//Redux
import { getDiagramData, getAttributes, getProjectData, clearDiagram } from "../redux/actions/dataActions";
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.profileTheme,
  paperComments: {
    padding: 10
  },
  nameDiagram: {
    color: theme.palette.primary.main
  },
  typeDiagram: {
    color: theme.palette.primary.main
  }
});

class objectDiagram extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.props.getDiagramData(this.props.match.params.diagramId);
    this._isMounted &&
      this.props.getAttributes();
    this._isMounted &&
      this.props.getProjectData(this.props.match.params.projectId);
  }
  componentWillUnmount() {
    this.props.clearDiagram()
    this._isMounted = false;
  }
  render() {
    const projectId = this.props.match.params.projectId;
    const diagramId = this.props.match.params.diagramId;
    const {
      diagram: { diagram, diagramUserId, comments, type, diagramName },
      project: { title },
      loading
    } = this.props.data;
    const { classes } = this.props;
    let copyDiagram = [];
    let copyType = "";
    if (diagram !== undefined) {
      copyDiagram = JSON.parse(diagram);
    }
    if (type !== undefined) {
      copyType = type;
    }
    let tipo = "";
    let typeOfDiagram = "";
    switch (type) {
      case "1":
        tipo = "Objeto/Acciones";
        typeOfDiagram = <Graph
          projectId={projectId}
          diagramId={diagramId}
          diagram={copyDiagram}
          diagramUserId={diagramUserId}
          type={copyType}
        />
        break;
      case "3":
        tipo = "Interacciones/Intra-acciones";
        typeOfDiagram = <Graph
        projectId={projectId}
        diagramId={diagramId}
        diagram={copyDiagram}
        diagramUserId={diagramUserId}
        type={copyType}
      />
        break;
      case "2":
        tipo = "Interrelaciones/reacciones";
        typeOfDiagram = <Graph
        projectId={projectId}
        diagramId={diagramId}
        diagram={copyDiagram}
        diagramUserId={diagramUserId}
        type={copyType}
        />
        break;
      default:
        tipo = "Diagrama";
        break;
    }
    let viewDiagram = !loading ? (
      typeOfDiagram
    ) : (
      <SkeletonDiagram />
    );

    let viewComments = !loading ? (
      <Comments comments={comments} />
    ) : (
      <div>
        <SkeletonComments />
        <SkeletonComments />
        <SkeletonComments />
        <SkeletonComments />
      </div>
    );

    let nameComments = !loading ? (
      <div>
        <Typography variant="body1">
          <span className={classes.typeDiagram}>Proyecto:</span> {title}
        </Typography>
        <Typography variant="body1">
          <span className={classes.typeDiagram}>Digrama:</span> {diagramName}
        </Typography>
        <Typography variant="body1">
          <span className={classes.typeDiagram}>Tipo:</span> {tipo}
        </Typography>
      </div>
    ) : (
      <SkeletonName />
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Paper className={classes.paperComments}>
            {nameComments}
            <CommentForm diagramId={diagramId} projectId={projectId} />
            {viewComments}
          </Paper>
        </Grid>
        <Grid item sm={9} xs={12}>
          {viewDiagram}
        </Grid>
      </Grid>
    );
  }
}

objectDiagram.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapActionsToProps = {
  getDiagramData,
  getAttributes,
  getProjectData,
  clearDiagram
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(objectDiagram));
