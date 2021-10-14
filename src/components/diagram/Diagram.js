import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Components
import CustomButton from "../../util/CustomButton";
import DeleteDiagram from "./DeleteDiagram";
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
import { Pencil, EyePlus } from "mdi-material-ui";
import ObjectIcon from "../../images/Di_Objetos.svg";
import InterrelationIcon from "../../images/Di_Interrelaciones.svg";
import InteractionIcon from "../../images/Di_Interacciones.svg";
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
  objectIcon: {
    width: "40px"
  }
});

class Diagram extends Component {
  render() {
    dayjs.locale(locale);
    dayjs.extend(relativeTime);
    const {
      classes,
      diagram: { diagramName, createdAt, diagramId, type },
      user: {
        authenticated,
        credentials: { userId }
      },
      projectUserId,
      projectId
    } = this.props;

    const deleteButton =
      authenticated && projectUserId === userId ? (
        <DeleteDiagram diagramId={diagramId} projectId={projectId} />
      ) : null;
    let iconDiagram = "";
    switch (type) {
      case "1":
        iconDiagram = (
          <img src={ObjectIcon} alt="Icon" className={classes.objectIcon} />
        );
        break;
      case "2":
        iconDiagram = (
          <img
            src={InteractionIcon}
            alt="Icon"
            className={classes.objectIcon}
          />
        );
        break;
      case "3":
        iconDiagram = (
          <img
            src={InterrelationIcon}
            alt="Icon"
            className={classes.objectIcon}
          />
        );
        break;
      default:
        break;
    }
    return (
      <div>
        <List className={classes.root}>
          <ListItem className={classes.item}>
            <ListItemAvatar>
              <Avatar className={classes.iconProject}>{iconDiagram}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={diagramName}
              secondary={`creado ${dayjs(createdAt).fromNow()}`}
            />
            <ListItemSecondaryAction className={classes.buttonDelete}>
              {deleteButton}
            </ListItemSecondaryAction>
            <ListItemSecondaryAction className={classes.buttonView}>
              <Link to={`/project/${projectId}/diagram/${diagramId}`}>
                {projectUserId === userId ? (
                  <CustomButton tip="Editar diagrama">
                    <Pencil color="primary" />
                  </CustomButton>
                ) : (
                  <CustomButton tip="Ver diagrama">
                    <EyePlus color="primary" />
                  </CustomButton>
                )}
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

Diagram.propTypes = {
  user: PropTypes.object.isRequired,
  diagram: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Diagram));
