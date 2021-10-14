import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
//Components
import CustomButton from "../../util/CustomButton";
import EditDetails from "../profile/EditDetails";
import Notifications from "./Notifications";
//Icons
import { AccountEdit, LogoutVariant, ViewDashboard } from "mdi-material-ui";
//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

const styles = theme => ({
  ...theme.formTheme,
  colorIcon: {
    color: "#fff"
  },
  avatarTitle: {
    display: "inline-flex",
    marginLeft: 10
  },
  logout: {
    color: "black"
  }
});

const SignedInLinks = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    props.logoutUser();
  }

  const {
    classes,
    user: {
      credentials: { firstName, imageUrl }
    }
  } = props;
  return (
    <div>
      <div>
        <Link to="/dashboard">
          <CustomButton tip="Dashboard">
            <ViewDashboard className={classes.colorIcon} />
          </CustomButton>
        </Link>
        <Notifications />
        <Typography variant="inherit" className={classes.avatarTitle}>
          {firstName}
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar
            alt="imageProfile"
            src={imageUrl}
            className={classes.avatar}
          />
        </IconButton>
        <Menu
          elevation={0}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountEdit />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              <EditDetails />
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LogoutVariant />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              <Link to="/" className={classes.logout}>
                <div onClick={handleLogout}>Cerrar cesión</div>
              </Link>
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  logoutUser
};

SignedInLinks.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SignedInLinks));
