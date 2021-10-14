import React from "react";
import Skeleton from "react-skeleton-loader";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  skeletonContainer: {
    display: "flex",
    marginBottom: "10px",
    marginTop: "10px"
  },
  skeletonImg: {
    marginRight: "18px"
  },
  skeletonTxt: {
    marginTop: "2px",
    marginBottom: "2px"
  }
});

function SkeletonProject(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.skeletonContainer}>
        <div className={classes.skeletonImg}>
          <Skeleton borderRadius="50%" width="40px" height="40px" />
        </div>
        <div>
          <p className={classes.skeletonTxt}>
            <Skeleton height="20px" />
          </p>
          <p className={classes.skeletonTxt}>
            <Skeleton height="12px" />
          </p>
        </div>
      </div>
      <div>
        <Skeleton height="2px" width="100%" />
      </div>
    </div>
  );
}

export default withStyles(styles)(SkeletonProject);
