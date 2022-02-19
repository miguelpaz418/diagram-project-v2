import React from "react";
import ChipIconInterrelation from "../chipIconsInterrelation";
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



import ChipIconsInteraction from './chipIconsInterrelation'

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

class InterrelationComponent extends React.PureComponent {


  handleClick =( event, data) => {
    event.preventDefault();

    var element = this.props.object
    var svgFile = ChipIconsInteraction(data)
    element.attr('image/xlinkHref', 'data:image/svg+xml;utf8,' + encodeURIComponent(svgFile));
    element.attr('root/title', data);
    this.props.handleClose()
  };

  render() {
    const { classes, parentsActions } = this.props;
    const interrelations = [
      "comunicación multidireccional",
      "comunicación bidireccional",
      "comunicación digital",
      "choque",
      "roce",
      "toque",
      "encaje",
      "dependencia"
    ];
    return (
        <div >
          <DialogTitle>Selecciona una acción</DialogTitle>
          <DialogContent>
          <Grid container spacing={0}>
            {interrelations.map(interrelation => {
              if(parentsActions.includes(interrelation)){
                return (
                  <Grid key={interrelation} item xs={12} sm={6}>
                    <Chip
                      key={interrelation}
                      id={interrelation}
                      data-testid={interrelation}
                      avatar={<ChipIconInterrelation pathIcon={interrelation} />}
                      label={interrelation}
                      onClick={((e) => this.handleClick(e, interrelation))}
                      className={classes.chip}
                      disabled
                    />
                  </Grid>
                );
              }else{
                return (
                  <Grid key={interrelation} item xs={12} sm={6}>
                    <Chip
                      key={interrelation}
                      id={interrelation}
                      data-testid={interrelation}
                      avatar={<ChipIconInterrelation pathIcon={interrelation} />}
                      label={interrelation}
                      onClick={((e) => this.handleClick(e, interrelation))}
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

export default withStyles(styles)(InterrelationComponent);
