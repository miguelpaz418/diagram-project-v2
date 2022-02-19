import React, { Component } from "react";
import PropTypes from "prop-types";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import locale from "dayjs/locale/es";
//Components
import Observer from "./Observer";
import EditDetailsProject from "./EditDetailsProject";
import SkeletonProjectData from "../../skeleton/SkeletonProjectData";
//MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
//Icons
import CalendarToday from "@material-ui/icons/CalendarToday";
//Redux
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.profileTheme,
  paperObservers: {
    display: "flex",
    flexWrap: "wrap",
    padding: "0.2rem",
    margin: "10px auto 10px auto"
  },
  chip: {
    margin: theme.spacing(1)
  },
  divider: {
    height: "2px",
    margin: 10
  }
});

class ProjectDetails extends Component {
  render() {
    dayjs.locale(locale);
    dayjs.extend(relativeTime);
    const {
      classes,
      project: {
        firstNameUser,
        lastNameUser,
        createdAt,
        title,
        description,
        objective,
        projectUserId
      },
      listDataObservers
    } = this.props;
    const { loading } = this.props.data;
    const { userId } = this.props.credentials;

    let dataProject = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-details">
            <Typography color="primary" variant="h6">
              Título: {title}
            </Typography>
            <hr />
            <Typography variant="body1">Descripción: {description}</Typography>
            <hr />
            <Typography variant="body1">Objetivo: {objective}</Typography>
            <hr />
            <Typography variant="body2">
              Creado por: {firstNameUser} {lastNameUser}
            </Typography>
            <hr />
            <Divider
              variant="fullWidth"
              component="li"
              className={classes.divider}
            />
            <hr />
            <Typography variant="body2" color="primary">
              Observadores
            </Typography>
            <div>
              {listDataObservers &&
                listDataObservers.map(observer => {
                  return (
                    <Observer
                      key={observer.userId}
                      email={observer.email}
                      imageUrl={observer.imageUrl}
                      chipClassName={classes.chip}
                      color="primary"
                      size="small"
                    />
                  );
                })}
            </div>
            <hr />
            <CalendarToday color="primary" />{" "}
            <span>Creado {dayjs(createdAt).fromNow()}</span>
            <hr />
            {projectUserId === userId && <EditDetailsProject />}
          </div>
        </div>
      </Paper>
    ) : (
      <SkeletonProjectData />
    );

    return dataProject;
  }
}

ProjectDetails.propTypes = {
  credentials: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials,
  data: state.data
});

export default connect(mapStateToProps)(withStyles(styles)(ProjectDetails));
