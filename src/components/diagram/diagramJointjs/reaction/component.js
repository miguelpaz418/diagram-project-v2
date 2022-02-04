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

class ReactionComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      nameObject: "",
      errors: {},
      objectDetail: "",
    };
  
  }

  componentDidMount() {

    if( this.props.object.hasOwnProperty('attributes')){
      this.setState({
        nameObject: undefinedToEmpty(this.props.object.attributes.attrs.label.text)
      })
    }
  }
  

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  validateData = data => {
    let errors = {};
    if (data.nameObject === "") errors.nameObject = "el campo no debe estar vacio";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  handleClickObject = (event) => {
    event.preventDefault();
          //var text = this.state.nameObject
    let data = { nameObject: this.state.nameObject };
    const { valid, errors } = this.validateData(data);
    if (!valid) {
      this.setState({
        errors: errors
      });
    } else {
      this.props.object.attr({
        label: { text: this.state.nameObject }
      });
      this.handleCloseObject()
    }
  };



  handleCloseObject = () => {
    this.setState({
      nameObject: "",
      objectDetail: "",
      errors: {}
    });
    this.props.handleClose()
  };
  

  render() {
    const { classes } = this.props;

    return (
        <div >
          <DialogTitle>Ingresar una reacción</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleClickObject}>
              <TextField
                  name="nameObject"
                  type="text"
                  label="Reacción"
                  placeholder="Ingresa una reacción"
                  className={classes.textField}
                  onChange={this.handleChange}
                  value={this.state.nameObject}
                  fullWidth
                  variant="outlined"
                  error={this.state.errors.nameObject ? true : false}
                  helperText={this.state.errors.nameObject}
                />
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

export default withStyles(styles)(ReactionComponent);
