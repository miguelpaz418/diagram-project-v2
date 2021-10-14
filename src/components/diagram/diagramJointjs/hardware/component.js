import React from "react";
//Icons
import { Close, Check } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import {InputLabel} from '@material-ui/core';

import { ColorPicker } from 'material-ui-color';




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

class ObjectComponent extends React.PureComponent {
  
  state = {
    nameObject: "",
    color: "",
    errors: {}
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChange2 = event => {
    this.setState({
      color: event.css.backgroundColor
    });
  };

  validateData = data => {
    let errors = {};
    if (data.nameObject === "") errors.nameObject = "Must not be empty";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = { nameObject: this.state.nameObject };
    const { valid, errors } = this.validateData(data);

    if (!valid) {
      this.setState({
        errors: errors
      });
    } else {
      this.props.handleClick(event, this.state.nameObject, this.state.color )
      this.setState({
        nameObject: "",
        errors: {}
      });
    }
  };

  

  render() {
    const { classes } = this.props;

    const palette = {
      default: '#333333',
      black: 'black',
      white: 'white',
    };

    return (
        <Dialog open={this.props.open} maxWidth="xs" onClose={this.props.handleClose}>
          <DialogTitle>Editar nombre del objeto</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="nameObject"
                type="text"
                label="Nombre"
                placeholder="Nombre del objeto"
                className={classes.textField}
                onChange={this.props.handleChange}
                value={this.props.nameObject}
                fullWidth
                error={this.state.errors.nameObject ? true : false}
                helperText={this.state.errors.nameObject}
              />
              <div>
                <InputLabel shrink={true} >Color de fondo</InputLabel >
                <ColorPicker
                  onChange={(e) => this.props.handleChange2(e,"colorObject")} 
                  value={this.props.colorObject}
                />
                <InputLabel shrink={true} >Color de texto</InputLabel>
                <ColorPicker
                      onChange={(e) => this.props.handleChange2(e,"colorName")} 
                      value={this.props.colorName}
                      defaultValue="red"
                      palette={palette}
                    />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Fab onClick={this.props.handleClose} color="secondary" size="small">
                <Close />
            </Fab>
            <Fab onClick={this.props.handleClick} color="primary" size="small">
                <Check />
            </Fab>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withStyles(styles)(ObjectComponent);
