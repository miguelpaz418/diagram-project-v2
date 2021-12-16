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

import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider";
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
    this.onMenuOpened()
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {

    let unreadNotificationsIds = this.props.notifications
      .filter(noti => !noti.read)
      .map(noti => noti.notificationId);
    if(unreadNotificationsIds.length > 0 ){
      this.props.markNotificationsRead(unreadNotificationsIds);
    }


  };
  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;
    const totalUnRead = notifications.filter((item) => item.read === false).length;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(noti => noti.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                totalUnRead
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
    let boxNotification =         
    <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">Notificaciones</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Tienes {totalUnRead} notificaciones sin leer
        </Typography>
      </Box>
      <Divider />
    </Box>
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((notification, index) => {
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? "secondary" : "primary";
          const icon =
          notification.type === "observer" ? (
              <AccountMultiplePlus
                color={iconColor}
                style={{ marginRight: 10 }}
              />
            ) : (
              <CommentText color={iconColor} style={{ marginRight: 10 }} />
            );

        const path =
            notification.type === "observer"
              ? `/project/${notification.projectId}`
              : `/project/${notification.projectId}/diagram/${notification.diagramId}`;


          return (
            
            <MenuItem key={index} onClick={this.handleClose}>
              {icon}
              <Typography
                variant="subtitle2"
                color="textPrimary"
                component={Link}
                to={path}
              >
                {notification.title}
                <Typography variant="body2" color="textSecondary">
                   {notification.description}
                </Typography>
                <Typography variant="caption">{time}</Typography>
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>

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
          {boxNotification}
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
