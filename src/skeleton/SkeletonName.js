import React from "react";
import Skeleton from "react-skeleton-loader";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  profileContainer: {
    textAlign: "center",
    display: "flex"
  },
  skeletonTxt: {
    marginTop: "2px",
    marginBottom: "2px"
  }
});

function SkeletonName(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.profileContainer}>
        <div>
          <p className={classes.skeletonTxt}>
            <Skeleton height="16px" />
          </p>
          <p className={classes.skeletonTxt}>
            <Skeleton height="14px" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(SkeletonName);
