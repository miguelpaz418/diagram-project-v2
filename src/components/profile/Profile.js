import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import locale from "dayjs/locale/es";
//Components
import CustomButton from "../../util/CustomButton";
import SkeletonProfile from "../../skeleton/SkeletonProfile";
//MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { CameraPlus } from "mdi-material-ui";
//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

const styles = theme => ({
  ...theme.profileTheme
});

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    dayjs.locale(locale);
    const {
      classes,
      user: {
        credentials: {
          firstName,
          lastName,
          createdAt,
          imageUrl,
          email,
          profession,
          //userId,
          bio,
          location
        },
        loading
      }
    } = this.props;

    let profileMarkup = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={this.handleImageChange}
            />
            <CustomButton
              tip="Editar foto de perfil"
              onClick={this.handleEditPicture}
              btnClassName="button"
              placement="top"
            >
              <CameraPlus color="primary" />
            </CustomButton>
          </div>
          <hr />
          <div className="profile-details">
            <Typography color="primary" variant="h6">
              {firstName} {lastName}
            </Typography>
            {email && (
              <div>
                <span>{email}</span>
              </div>
            )}
            <hr />
            {profession && (
              <Typography variant="body2">Profesión: {profession}</Typography>
            )}
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <div>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </div>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Se unió en {dayjs(createdAt).format("MMMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    ) : (
      <SkeletonProfile />
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  logoutUser,
  uploadImage
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
