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

import MenuItem from '@material-ui/core/MenuItem';
import {InputLabel, FormControl, Select} from '@material-ui/core';

import { connect } from "react-redux";

const styles = theme => ({
  ...theme.formTheme,
  formControl: {
    minWidth: 120,
  },
  buttonRoot: {
    display: "flex",
    padding: 0
  },
  buttonIcon: {
    padding: 0
  }
});


class AttributeComponent extends React.PureComponent {
  state = {
    open: false,
    inputType: "number",
    inputValue: "",
    inputLabel: "",
    errors: {}
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      errors: {}
    });
  };

  handleChange = event => {
    let label = event.nativeEvent.target.textContent;
    this.setState({
      [event.target.name]: event.target.value,
      inputLabel: label,
      inputValue: "",
    });
  };

  handleChange2 = event => {
    this.setState({
      [event.target.name]: this.validateChange(event.target.value)
    });
  };

  validateChange = (value) => {

    if(this.props.inputType === 'number' && !Number(value)){
      return value.replace(/\D/g, '');
    }
    return value
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = { attribute: this.state.inputLabel, value: this.state.inputValue };

    const { valid, errors } = this.validateData(data);

    if (!valid) {
      this.setState({
        errors: errors
      });
    } else {
      this.props.handleClick(event,data)
      this.setState({
        open: false,
        inputType: "number",
        inputValue: "",
        inputLabel: "",
        errors: {}
      });
    }
  };

  validateData = data => {
    let errors = {};
    if (data.attribute === "") errors.attribute = "Must not be empty";
    if (data.value === "") errors.value = "Must not be empty";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  makeTextInput = (val) => {
    return (
          <TextField
            name="value"
            type= 'text'
            label="Valor"
            placeholder="Valor"
            className={val}
            value={this.props.value}
            onChange={this.props.handleChange2}
            fullWidth
            variant="outlined"
            error={this.state.errors.value ? true : false}
            helperText={this.state.errors.value}
          />
      );
  };

  

  render() {
    const { classes } = this.props;
    //get the attributes from data in redux
    const { attributes } = this.props.data;

    if (this.props.inputType !== '') {
      var newInputText = this.makeTextInput(classes.textField);
    }
    return (
        <Dialog open={this.props.open} maxWidth="xs" onClose={this.props.handleClose}>
          <DialogTitle>Editar atributo</DialogTitle>
          <DialogContent>
            <form onSubmit={this.props.handleClick}>
              <FormControl variant="outlined" fullWidth className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Nombre</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Nombre"
                  name="attributeComplete"
                  value={this.props.attributeComplete}
                  onChange={this.props.handleChange}
                  fullWidth
                >
                  {attributes.map((option) => (
                    <MenuItem key={option.id} value={option.id+"-"+option.type}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {newInputText}
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


const mapStateToProps = state => ({
  data: state.data
});

const mapActionsToProps = {
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(AttributeComponent));
