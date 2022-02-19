import React, { Component } from "react";
import PropTypes from "prop-types";
//MUI
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
//Components
import ProjectDetails from "../components/project/ProjectDetails";
import CreateDiagram from "../components/diagram/CreateDiagram";
import Diagram from "../components/diagram/Diagram";
import SkeletonProject from "../skeleton/SkeletonProject";
//Redux
import { connect } from "react-redux";
import { getProjectData } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.formTheme,
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class project extends Component {
  state = { activeIndex: 0 };

  handleChange = (_, activeIndex) => this.setState({ activeIndex });

  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.props.getProjectData(projectId);
  }
  render() {
    const { activeIndex } = this.state;
    const {
      classes,
      user: {
        authenticated,
        credentials: { userId }
      }
    } = this.props;
    const { project, observers, loading } = this.props.data;
    const listObservers = [];
    const listIdsObservers = [];
    const listDataObservers = [];
    const listDataDiagrams = [];
    Object.assign(listObservers, observers);
    Object.assign(listIdsObservers, project.observers);
    Object.assign(listDataDiagrams, project.diagrams);

    let objectDiagrams = !loading ? (
      listDataDiagrams.map(diagram =>
        diagram.type === "1" ? (
          <Diagram
            diagram={diagram}
            key={diagram.diagramId}
            projectUserId={project.projectUserId}
            projectId={project.projectId}
            type="objectDiagram"
          />
        ) : null
      )
    ) : (
      <div>
        <SkeletonProject />
        <SkeletonProject />
        <SkeletonProject />
      </div>
    );

    let interrelationDiagrams = !loading ? (
      listDataDiagrams.map(diagram =>
        diagram.type === "2" ? (
          <Diagram
            diagram={diagram}
            key={diagram.diagramId}
            projectUserId={project.projectUserId}
            projectId={project.projectId}
            type="interrelationDiagram"
          />
        ) : null
      )
    ) : (
      <div>
        <SkeletonProject />
        <SkeletonProject />
        <SkeletonProject />
      </div>
    );

    let interactionDiagrams = !loading ? (
      listDataDiagrams.map(diagram =>
        diagram.type === "3" ? (
          <Diagram
            diagram={diagram}
            key={diagram.diagramId}
            projectUserId={project.projectUserId}
            projectId={project.projectId}
            type="interactionDiagram"
          />
        ) : null
      )
    ) : (
      <p>Loading...</p>
    );

    listObservers.map(observer => {
      return listIdsObservers.find(id => {
        if (id === observer.userId) {
          return listDataObservers.push(observer);
        } else {
          return null;
        }
      });
    });

    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <ProjectDetails
            project={project}
            listDataObservers={listDataObservers}
          />
        </Grid>
        <Grid item sm={8} xs={12}>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={activeIndex} onChange={this.handleChange}>
                <Tab label="Objetos/Acciones" />
                <Tab label="Interacciones/Intra-acciones" />
                <Tab label="Interrelaciones/Reacciones" />
                {authenticated && project.projectUserId === userId ? (
                  <CreateDiagram
                    projectId={this.props.match.params.projectId}
                  />
                ) : null}
              </Tabs>
            </AppBar>
            {activeIndex === 0 && <TabPanel>{objectDiagrams}</TabPanel>}
            {activeIndex === 1 && <TabPanel>{interactionDiagrams}</TabPanel>}
            {activeIndex === 2 && <TabPanel>{interrelationDiagrams}</TabPanel>}
          </div>
        </Grid>
      </Grid>
    );
  }
}

function TabPanel(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 24 }}>
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

project.propTypes = {
  getProjectData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getProjectData }
)(withStyles(styles)(project));
