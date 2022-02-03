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
import {InputLabel, Select, MenuItem} from '@material-ui/core';

import { ColorPicker } from 'material-ui-color';

import { 
  undefinedToEmpty,
} from '../functionsDiagram'



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

  constructor(props) {
    super(props);
    this.state = {
      nameObject: "",
      color: "",
      errors: {},
      objectDetail: '',
      colorObject: "",
      colorName: "",
    };
  
  }

  componentDidMount() {

    if( this.props.object.hasOwnProperty('attributes')){
      this.setState({
        colorName: undefinedToEmpty(this.props.object.attributes.attrs.label.fill), 
        colorObject: undefinedToEmpty(this.props.object.attributes.attrs.body.fill),
        nameObject: undefinedToEmpty(this.props.object.attributes.attrs.label.text),
      })
    }

  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  handleChange2 = (event,name) => {
    this.setState({
        [name]: event.css.backgroundColor
    });
  };

  validateData = data => {
    let errors = {};
    if (data.nameObject === "") errors.nameObject = "el campo no debe estar vacio";
    if (this.props.parentsActions.includes(data.nameObject.toLowerCase())) errors.nameObject = "el nombre ya esta usado";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  handleClickObject = (event) => {
    event.preventDefault();

    if(this.props.type === "1"){
      //var text = this.state.nameObject
      let data = { nameObject: this.state.nameObject };
      const { valid, errors } = this.validateData(data);
      if (!valid) {
        this.setState({
          errors: errors
        });
      } else {
        this.props.object.attr({
          label: { text: this.state.nameObject, fill: this.state.colorName },
          root: { labelcolor: this.state.colorName },
          body: { fill: this.state.colorObject }
        });
        this.handleCloseObject()
      }
    }else{
        this.props.object.attr({
          label: { text: this.state.objectDetail.name, fill: this.state.objectDetail.colorName },
          root: { labelcolor: this.state.objectDetail.colorName, rid: this.state.objectDetail.id },
          body: { fill: this.state.objectDetail.color }
        });
        //this.props.object.prop('id', this.state.objectDetail.id);
        this.handleCloseObject()
    }

  };



  handleCloseObject = () => {

    this.props.handleClose()
    this.setState({
      errors: {},
      objectDetail: ''
    });
  };
  

  render() {
    const { classes, type, object } = this.props;

    const palette = {
      default: '#333333',
      black: 'black',
      white: 'white',
    };

    let title = ""
    let objectInputs = <div></div>
    if(type === "1"){
      title = "Editar nombre del objeto"
      objectInputs =
      <div>
        <TextField
          name="nameObject"
          type="text"
          label="Nombre"
          placeholder="Nombre del objeto"
          className={classes.textField}
          onChange={this.handleChange}
          value={this.state.nameObject}
          fullWidth
          error={this.state.errors.nameObject ? true : false}
          helperText={this.state.errors.nameObject}
        />
        <div>
          <InputLabel shrink={true} >Color de fondo</InputLabel >
          <ColorPicker
            onChange={(e) => this.handleChange2(e,"colorObject")} 
            value={this.state.colorObject}
          />
          <InputLabel shrink={true} >Color de texto</InputLabel>
          <ColorPicker
            onChange={(e) => this.handleChange2(e,"colorName")} 
            value={this.state.colorName}
            defaultValue="red"
            palette={palette}
          />
        </div>
      </div>
    }else{
      title = "Elegir objeto"
      const { listObjects, parentsActions } = this.props;
      //.filter(obj => !names.includes(obj.name))
      objectInputs =
      <div>
        <InputLabel id="demo-simple-select-outlined-label">Objeto</InputLabel>
        <Select
          label="Objeto"
          value={this.state.objectDetail}
          name="objectDetail"
          onChange={this.handleChange}
          fullWidth
        >
          {listObjects && object.hasOwnProperty('attributes') && 
          listObjects
          .filter(obj => obj.shape === object.attributes.attrs.root.title)
          .filter(obj => !parentsActions.includes(obj.name))
          .map((obj) => {
            return (
              <MenuItem key={obj.id} value={obj}>
                {obj.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    }


    return (
        <div>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              {objectInputs}
            </form>
          </DialogContent>
          <DialogActions>
            <Fab onClick={this.handleCloseObject} color="secondary" size="small">
                <Close />
            </Fab>
            <Fab onClick={this.handleClickObject} color="primary" size="small">
                <Check />
            </Fab>
          </DialogActions>
        </div>
    );
  }
}

export default withStyles(styles)(ObjectComponent);
