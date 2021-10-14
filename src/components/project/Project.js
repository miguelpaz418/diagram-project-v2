import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Components
import CustomButton from "../../util/CustomButton";
import DeleteProject from "./DeleteProject";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import locale from "dayjs/locale/es";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
//Icons
import { EyePlus } from "mdi-material-ui";
import IconCoordinated from "../../images/coordinador.svg";
import IconObservador from "../../images/observador.svg";
//Redux
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.formTheme,
  root: {
    width: "100%",
    //maxWidth: 360,
    backgroundColor: "ffff00"
  },
  buttonDelete: {
    position: "absolute",
    right: "2%"
  },
  buttonView: {
    position: "absolute",
    right: "8%"
  },
  item: {
    //marginBottom: 10
  },
  text: {
    display: "flex"
  },
  iconProject: {
    backgroundColor: theme.palette.primary.light
  },
  projectIcon: {
    width: "40px"
  }
});

class Project extends Component {
  render() {
    dayjs.locale(locale);
    dayjs.extend(relativeTime);
    const {
      classes,
      project: { title, description, projectId, projectUserId },
      user: {
        authenticated,
        credentials: { userId }
      },
      isCoordinated
    } = this.props;

    const deleteButton =
      authenticated && projectUserId === userId ? (
        <DeleteProject projectId={projectId} />
      ) : null;
    return (
      <div>
        <List className={classes.root}>
          <ListItem className={classes.item}>
            <ListItemAvatar>
              {!isCoordinated ? (
                <Avatar className={classes.iconProject}>
                  <img
                    src={IconCoordinated}
                    alt="Icon"
                    className={classes.projectIcon}
                  />
                </Avatar>
              ) : (
                <Avatar className={classes.iconProject}>
                  <img
                    src={IconObservador}
                    alt="Icon"
                    className={classes.projectIcon}
                  />
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText primary={title} secondary={description} />
            <ListItemSecondaryAction className={classes.buttonDelete}>
              {deleteButton}
            </ListItemSecondaryAction>
            <ListItemSecondaryAction className={classes.buttonView}>
              <Link to={`project/${projectId}`}>
                <CustomButton tip="Ver proyecto">
                  <EyePlus color="primary" />
                </CustomButton>
              </Link>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider
          variant="fullWidth"
          component="li"
          className={classes.divider}
        />
      </div>
    );
  }
}

Project.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Project));
