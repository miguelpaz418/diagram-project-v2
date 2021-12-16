import React from "react";
//Icons
import { Close } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";




const styles = theme => ({
  ...theme.formTheme,
  buttonRoot: {
    display: "flex",
    padding: 0
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  buttonIcon: {
    padding: 0
  }
});


/*
 * Container
 * ==================================== */

class MessageDialog extends React.PureComponent {
  
  state = {
    nameObject: "",
    color: "",
    errors: {}
  };


  render() {
    const { message } = this.props;

    return (
        <Dialog open={this.props.open} maxWidth="xs" onClose={this.props.handleClose}>
          <DialogTitle>Restricción</DialogTitle>
          <DialogContent>
            <Typography variant="h6">
                {message}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Fab onClick={this.props.handleClose} color="secondary" size="small">
                <Close />
            </Fab>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withStyles(styles)(MessageDialog);