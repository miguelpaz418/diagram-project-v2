import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
// Icons
import {
  Bell,
  BellRing,
  CommentText,
  AccountMultiplePlus
} from "mdi-material-ui";
// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

class Notifications extends Component {
  state = {
    anchorEl: null
  };
  handleOpen = event => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter(noti => !noti.read)
      .map(noti => noti.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };
  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(noti => noti.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter(noti => noti.read === false).length
              }
              color="error"
            >
              <BellRing style={{ color: "#fff" }} />
            </Badge>
          ))
        : (notificationsIcon = <Bell style={{ color: "#fff" }} />);
    } else {
      notificationsIcon = <Bell style={{ color: "#fff" }} />;
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(noti => {
          const verb =
            noti.type === "observer"
              ? "te agregó como observador en su nuevo proyecto"
              : "comentó en uno de tus diagramas";
          const time = dayjs(noti.createdAt).fromNow();
          const iconColor = noti.read ? "secondary" : "primary";
          const icon =
            noti.type === "observer" ? (
              <AccountMultiplePlus
                color={iconColor}
                style={{ marginRight: 10 }}
              />
            ) : (
              <CommentText color={iconColor} style={{ marginRight: 10 }} />
            );
          const path =
            noti.type === "observer"
              ? `/project/${noti.projectId}`
              : `/project/${noti.projectId}/diagram/${noti.diagramId}`;

          return (
            <MenuItem key={noti.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                variant="body2"
                to={path}
                color="textPrimary"
              >
                <span style={{ fontWeight: "bold" }}>{noti.sender}</span> {verb}
                <br />
                <Typography variant="caption">{time}</Typography>
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          Aun no tienes notificaciones
        </MenuItem>
      );
    return (
      <Fragment>
        <Tooltip title="Notificaciones">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array
};

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(Notifications);
