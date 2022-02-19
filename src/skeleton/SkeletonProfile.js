import React from "react";
import Skeleton from "react-skeleton-loader";
//MUI
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  profileContainer: {
    padding: 20,
    textAlign: "center"
  },
  profileTitle: {
    marginBottom: 10
  },
  profileImg: {
    marginBottom: 10
  }
});

function SkeletonProfile(props) {
  const { classes } = props;
  return (
    <Paper className={classes.profileContainer}>
      <div className={classes.profileImg}>
        <Skeleton borderRadius="50%" width="150px" height="150px" />
      </div>
      <div className={classes.profileTitle}>
        <Skeleton height="20px" width="80%" />
      </div>
      <div className={classes.profileTitle}>
        <Skeleton height="12px" />
      </div>
      <div className={classes.profileTitle}>
        <Skeleton height="12px" />
      </div>
      <div className={classes.profileTitle}>
        <Skeleton height="12px" />
      </div>
      <div className={classes.profileTitle}>
        <Skeleton height="12px" />
      </div>
      <div className={classes.profileTitle}>
        <Skeleton height="12px" />
      </div>
    </Paper>
  );
}

export default withStyles(styles)(SkeletonProfile);
