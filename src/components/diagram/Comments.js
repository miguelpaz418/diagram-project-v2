import React, { Component } from "react";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import locale from "dayjs/locale/es";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
//import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const styles = theme => ({
  ...theme.formTheme,
  root: {
    "@media (min-width: 1200px)": {
      width: "100%",
      maxHeight: 630,
      position: "relative",
      overflow: "auto"
    },
    "@media (min-width: 1600px)": {
      width: "100%",
      maxHeight: 520,
      position: "relative",
      overflow: "auto"
    }
  },
  text: {
    display: "flex"
  },
  inline: {
    display: "inline"
  },
  listItem: {
    padding: 0
  }
});

class Comments extends Component {
  render() {
    dayjs.locale(locale);
    dayjs.extend(relativeTime);
    const { comments, classes } = this.props;
    const listComments = [];
    Object.assign(listComments, comments);
    return (
      <div>
        <List className={classes.root} dense>
          {listComments.map(comment => {
            return (
              <div key={comment.commentId}>
                <ListItem className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar alt="avatar" src={comment.userImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          color="primary"
                        >
                          {`${comment.firstNameUser} `}
                        </Typography>
                        <Typography component="span" variant="body2">
                          {`${comment.body} - `}
                        </Typography>
                      </div>
                    }
                    secondary={
                      <Typography component="span" variant="caption">
                        {dayjs(comment.createdAt).fromNow()}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider
                  variant="fullWidth"
                  component="li"
                  className={classes.divider}
                />
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Comments);
