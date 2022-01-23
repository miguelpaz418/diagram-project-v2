import React from "react";
import ChipIconInteraction from "../chipIconsInteraction";
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

import ChipIconsInteraction from './chipIconsInteraction'

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

class InteractionComponent extends React.PureComponent {


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
    const interactions = [
      "conectar",
      "presionar",
      "introducir",
      "empujar",
      "doblar",
      "cortar",
      "parar",
      "esperar",
      "encender",
      "agarrar",
      "soltar",
      "sacar",
      "quitar",
      "levantar",
      "girar",
      "mover",
      "comenzar",
      "finalizar",
      "accionar",
      "apagar",
      "bajar",
      "subir",
      "salir",
      "abrir",
      "poner"
    ];
    return (
        <div>
          <DialogTitle>Selecciona una acción</DialogTitle>
          <DialogContent>
          <Grid container spacing={0}>
            {interactions.map(interaction => {
              if(parentsActions.includes(interaction)){
                return (
                  <Grid key={interaction} item xs={6} sm={4}>
                    <Chip
                      key={interaction}
                      id={interaction}
                      avatar={<ChipIconInteraction pathIcon={interaction} />}
                      label={interaction}
                      onClick={((e) => this.handleClick(e, interaction))}
                      className={classes.chip}
                      disabled
                    />
                  </Grid>
                );
              }else{
                return (
                  <Grid key={interaction} item xs={6} sm={4}>
                    <Chip
                      key={interaction}
                      id={interaction}
                      avatar={<ChipIconInteraction pathIcon={interaction} />}
                      label={interaction}
                      onClick={((e) => this.handleClick(e, interaction))}
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

export default withStyles(styles)(InteractionComponent);
