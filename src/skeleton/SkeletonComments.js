import React from "react";
import Skeleton from "react-skeleton-loader";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  profileContainer: {
    textAlign: "center",
    display: "flex"
  },
  skeletonImg: {
    marginRight: "18px"
  },
  skeletonTxt: {
    marginTop: "2px",
    marginBottom: "2px"
  },
  skeletonDivider: {
    marginBottom: "5px"
  }
});

function SkeletonComments(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.profileContainer}>
        <div className={classes.skeletonImg}>
          <Skeleton borderRadius="50%" width="40px" height="40px" />
        </div>
        <div>
          <p className={classes.skeletonTxt}>
            <Skeleton height="12px" />
          </p>
          <p className={classes.skeletonTxt}>
            <Skeleton height="10px" />
          </p>
        </div>
      </div>
      <div className={classes.skeletonDivider}>
        <Skeleton height="2px" width="100%" />
      </div>
    </div>
  );
}

export default withStyles(styles)(SkeletonComments);
