import React from "react";
import ChipIconAction from "../chipIconsAction";
//Icons
import { Close } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Chip from "@material-ui/core/Chip";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Grid from '@material-ui/core/Grid';

import { 
  changeValueToArray,
} from '../functionsDiagram'

import ChipIconsAction from './chipIconsAction'

const styles = theme => ({
  buttonRoot: {
    display: "flex",
    padding: 0
  },
  buttonIcon: {
    padding: 0
  },
  chip: {
    margin: theme.spacing(1)
  }
});



/*
 * Container
 * ==================================== */

class ActionComponent extends React.PureComponent {


  handleClick =( event, data) => {
    event.preventDefault();

    var element = this.props.object
    var svgFile = ChipIconsAction(data)
    let previousTitle = element.attributes.attrs.root.title
    element.attr('image/xlinkHref', 'data:image/svg+xml;utf8,' + encodeURIComponent(svgFile));
    element.attr('root/title', data);
    let parent = element.getParentCell()

    if(parent !== null){
        changeValueToArray (parent, previousTitle, data, "actions")
    }
    this.props.handleClose()
  };

  render() {
    const { classes, parentsActions } = this.props;
    const actions = [
      "desplazar",
      "agarrar",
      "lanzar",
      "levantar",
      "presionar",
      "gestualizar",
      "soltar",
      "leer",
      "girar",
      "introducir",
      "adherir",
      "arrastrar",
      "ajustar",
      "retroalimentar",
    ];
    return (
        <div >
          <DialogTitle>Selecciona una acción</DialogTitle>
          <DialogContent>
          <Grid container spacing={0}>
            {actions.map(action => {
              if(parentsActions.includes(action)){
                return (
                  <Grid key={action} item xs={6} sm={4}>
                    <Chip
                      key={action}
                      id={action}
                      data-testid={action}
                      avatar={<ChipIconAction pathIcon={action} />}
                      label={action}
                      onClick={((e) => this.handleClick(e, action))}
                      className={classes.chip}
                      disabled
                    />
                  </Grid>
                );
              }else{
                return (
                  <Grid key={action} item xs={6} sm={4}>
                    <Chip
                      key={action}
                      id={action}
                      data-testid={action}
                      avatar={<ChipIconAction pathIcon={action} />}
                      label={action}
                      onClick={((e) => this.handleClick(e, action))}
                      className={classes.chip}
                    />
                  </Grid>
                );
              }

            })}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Fab onClick={this.props.handleClose} color="secondary" size="small">
              <Close />
            </Fab>
          </DialogActions>
        </div>
    );
  }
}

export default withStyles(styles)(ActionComponent);
