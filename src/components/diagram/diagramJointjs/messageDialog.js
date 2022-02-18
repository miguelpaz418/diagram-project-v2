import React from "react";
//Icons
import { Close, Check } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";


import InteractionModal from "./interaction/component";
import ActionModal from './action/component';
import AttributeModal from './attribute/component';
import InterrelationModal from './interrelation/component';
import ReactionModal from './reaction/component';
import ObjectModal from './hardware/component';

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
    const { message, open, handleClose, type, parentsActions, object, typeDiagram, listObjects } = this.props;

    let content = ""
    let size = "xs"
    switch (type) {
      case "action":
        content = 
        <ActionModal 
          handleClose={handleClose}
          parentsActions={parentsActions}
          object={object}
        />
      break;
      case "attribute":
        content = 
        <AttributeModal 
          handleClose={handleClose}
          parentsAttributes={parentsActions}
          object={object}
        />
      break;
      case "interaction":
        content = 
        <InteractionModal 
          parentsActions={parentsActions} 
          handleClose={handleClose}
          object={object}
        />          
      break;
      case "interrelation":
        content = 
        <InterrelationModal 
          parentsActions={parentsActions} 
          handleClose={handleClose}
          object={object}
        />     
        size = "sm"
      break;
      case "reaction":
        content = 
        <ReactionModal 
          parentsActions={parentsActions} 
          handleClose={handleClose}
          object={object}
        />      
      break;
      case "object":
        content = 
        <ObjectModal 
          parentsActions={parentsActions} 
          handleClose={handleClose}
          object={object}
          type={typeDiagram}
          listObjects={listObjects}
        />      
      break;
      case "information":
          content = 
          <div>          
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
          </div>
      break;
      case "change":
          content = 
          <div>          
            <DialogTitle>Información</DialogTitle>
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
          </div>
      break;
      case "confirmation":
        content = 
        <div>          
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <Typography variant="h6">
                {message}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Fab onClick={this.props.handleClose} color="secondary" size="small">
                <Close />
            </Fab>
            <Fab onClick={this.props.handleClick} color="primary" size="small">
                <Check />
            </Fab>
          </DialogActions>
        </div>
      break;
      default:
          content = <div></div>
      break;
    }

    return (
        <Dialog open={open} maxWidth={size} onClose={handleClose}>
          {content}
        </Dialog>
    );
  }
}

export default withStyles(styles)(MessageDialog);