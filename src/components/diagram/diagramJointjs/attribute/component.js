import React from "react";
//Icons
import { Close, Check } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";

import MenuItem from '@material-ui/core/MenuItem';
import {InputLabel, FormControl, Select} from '@material-ui/core';

import { connect } from "react-redux";

import { 
  undefinedToEmpty,
  changeValueToArray
} from '../functionsDiagram'

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
    errors: {},
    attributeName: "",
    value: "",
    attributeType: "",
    attributeComplete: "",
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.props.handleClose()
    this.setState({
      open: false,
      errors: {},
      value: "",
      attributeComplete: "",
    });
  };

  componentDidMount() {

    if( this.props.object.hasOwnProperty('attributes') ){
      var nameObject = undefinedToEmpty(this.props.object.attributes.attrs.root.text)
      var attributeComplete = undefinedToEmpty(this.props.object.attributes.attrs.root.key)
      var attributeType = "text"
      
      if(nameObject !== ""){
        var attributeName = nameObject.split(":")[0]
        attributeType = attributeComplete.split("-")[1]
      }
      this.setState({
        attributeName: attributeName,
        value: undefinedToEmpty(this.props.object.attributes.attrs.root.attrval),
        attributeType: attributeType,
        attributeComplete: attributeComplete,
      })
    }
  }

  handleChangeAttribute = event => {
    let label = event.nativeEvent.target.textContent;
    let arrayDeCadenas = event.target.value.split("-");
    this.setState({
      attributeComplete: event.target.value,
      attributeName: label,
      attributeType: arrayDeCadenas[1],
      value: "",
    });
  };

  handleChange2 = event => {
    this.setState({
      [event.target.name]: this.validateChange(event.target.value)
    });
  };

  validateChange = (value) => {
    if(this.state.attributeType === 'number' && !Number(value)){
        return value.replace(/\D/g, '');
    }
    return value
  };


  handleClickAttribute = event => {
    event.preventDefault();
    var element = this.props.object
    let previousTitle = element.attributes.attrs.root.title
    var text = this.state.attributeName + ': ' + this.state.value
    if (text !== null) {
        element.attr({
            label: { text: text },
            root: { 
                key: this.state.attributeComplete,
                attrval: this.state.value,
                title: this.state.attributeName
            }
        });
        let parent = element.getParentCell()
        if(parent !== null){
            changeValueToArray (parent, previousTitle, this.state.attributeName, "attributes")
        }
        this.props.handleClose()
        this.setState({
            attributeName: "",
            value: "",
            attributeType: "",
            attributeComplete: "",
        });
    }
  }; 
  

  render() {
    const { classes, parentsAttributes } = this.props;
    //get the attributes from data in redux
    const { attributes } = this.props.data;
    return (
        <div>
          <DialogTitle>Editar atributo</DialogTitle>
          <DialogContent>
            <form onSubmit={this.props.handleClick}>
              <FormControl variant="outlined" fullWidth className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Nombre</InputLabel>
                <Select
                  label="Nombre"
                  value={this.state.attributeComplete}
                  onChange={this.handleChangeAttribute}
                  fullWidth
                >
                  {attributes && parentsAttributes && 
                  attributes
                  .filter(option => !parentsAttributes.includes(option.name))
                  .map((option) => {
                    return (
                      <MenuItem key={option.id} value={option.id+"-"+option.type}>
                        {option.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                name="value"
                type= 'text'
                label="Valor"
                placeholder="Valor"
                className={classes.textField}
                value={this.state.value}
                onChange={this.handleChange2}
                fullWidth
                variant="outlined"
                error={this.state.errors.value ? true : false}
                helperText={this.state.errors.value}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Fab onClick={this.handleClose} color="secondary" size="small">
              <Close />
            </Fab>
            <Fab onClick={this.handleClickAttribute} color="primary" size="small">
              <Check />
            </Fab>
          </DialogActions>
        </div>
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
