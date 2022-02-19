import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../../images/logoNav.svg";
//Components
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.formTheme,
  buttonEdit: {
    position: "relative",
    left: "70%"
  },
  button: {
    float: "right"
  },
  containerNav: {
    margin: "auto"
  },
  colorIcon: {
    color: "#fff"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "inline-flex"
  },
  iconNav: {
    height: "45px"
  }
});

class Navbar extends Component {
  render() {
    const { authenticated, classes } = this.props;
    const links = authenticated ? (
      <div>
        <SignedInLinks />
      </div>
    ) : (
      <div>
        <SignedOutLinks />
      </div>
    );
    const home = authenticated ? (
      <Link to="/dashboard">
        <img src={AppIcon} alt="Icon" className={classes.iconNav} />
      </Link>
    ) : (
      <Link to="/">
        <img src={AppIcon} alt="Icon" className={classes.iconNav} />
      </Link>
    );
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <div className={classes.title}>{home}</div>
            <div color="inherit">{links}</div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
