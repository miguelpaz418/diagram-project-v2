import React from "react";
import Skeleton from "react-skeleton-loader";
//MUI
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  profileContainer: {
    backgroundColor: "#fafafa",
    "@media (min-width: 1000px)": {
      height: "100%",
      width: "100%",
      minHeight: "32rem",
      maxHeight: "32rem",
      minWidth: "50rem",
      maxWidth: "50rem"
    },
    "@media (min-width: 1200px)": {
      height: "100%",
      width: "100%",
      minHeight: "48rem",
      maxHeight: "48rem",
      minWidth: "56rem",
      maxWidth: "56rem"
    },
    "@media (min-width: 1600px)": {
      height: "100%",
      width: "100%",
      minHeight: "41rem",
      maxHeight: "41rem",
      minWidth: "65.5rem",
      maxWidth: "65.5rem"
    },
    "@media (min-width: 1920px)": {
      height: "100%",
      width: "100%",
      minHeight: "62rem",
      maxHeight: "62rem",
      minWidth: "70rem",
      maxWidth: "70rem"
    }
  }
});

function SkeletonDiagram(props) {
  const { classes } = props;
  return (
    <Paper className={classes.profileContainer}>
      <Skeleton height="62%" width="45px" />
    </Paper>
  );
}

export default withStyles(styles)(SkeletonDiagram);
