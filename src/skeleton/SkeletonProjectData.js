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
  }
});

function SkeletonProjectData(props) {
  const { classes } = props;
  return (
    <Paper className={classes.profileContainer}>
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
        <Skeleton height="2px" width="100%" />
      </div>
      <div className={classes.profileTitle}>
        <Skeleton height="12px" />
      </div>
      <div className={classes.profileTitle}>
        <Skeleton height="12px" />
      </div>
      <div className={classes.profileTitle}>
        <Skeleton height="35px" width="25%" />
      </div>
    </Paper>
  );
}

export default withStyles(styles)(SkeletonProjectData);
