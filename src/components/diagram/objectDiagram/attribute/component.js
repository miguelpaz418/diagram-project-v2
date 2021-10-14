import React from "react";
import style from "styled-components";
import type { DiagComponentProps } from "react-flow-diagram";
//Icons
import { Close, Check } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  ...theme.formTheme,
  buttonRoot: {
    display: "flex",
    padding: 0
  },
  buttonIcon: {
    padding: 0
  }
});

const AttributeStyle = style.div`
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: .5rem;
  border: 3px solid #000;
  word-wrap: break-word;
`;

const Name = style.span`
  flex: 1 0;
  padding: .5em;
  font-size: .8rem;
  font-weight: bold;
  overflow: hidden;
`;

export type AttributeProps = DiagComponentProps & {
  name: string
};
const Attribute = (props: AttributeProps) => (
  <Tooltip title="Atributo" placement="top">
    <AttributeStyle width={props.model.width} height={props.model.height}>
      <Name>{props.model.name === "test" ? "" : props.model.name}</Name>
    </AttributeStyle>
  </Tooltip>
);

type AttributeComponentProps = DiagComponentProps;
type AttributeComponentState = {
  name: string
};
class AttributeComponent extends React.PureComponent<
  AttributeComponentProps,
  AttributeComponentState
> {
  state = {
    name: this.props.model.name,
    value: "",
    attribute: "",
    open: false,
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
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = { attribute: this.state.attribute, value: this.state.value };

    const { valid, errors } = this.validateData(data);

    if (!valid) {
      this.setState({
        errors: errors
      });
    } else {
      this.props.setName({
        id: this.props.model.id,
        name: `${this.state.attribute}: ${this.state.value}`
      });
      this.setState({
        open: false,
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

  render() {
    const { classes } = this.props;
    return (
      <>
        <div onDoubleClick={this.handleOpen}>
          <Attribute {...this.props} name={this.state.name} />
        </div>
        <Dialog open={this.state.open} maxWidth="xs" onClose={this.handleClose}>
          <DialogTitle>Editar atributo</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="attribute"
                type="text"
                label="Nombre"
                placeholder="Nombre del atributo"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
                error={this.state.errors.attribute ? true : false}
                helperText={this.state.errors.attribute}
              />
              <TextField
                name="value"
                type="text"
                label="Valor"
                placeholder="Valor"
                className={classes.textField}
                onChange={this.handleChange}
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
            <Fab onClick={this.handleSubmit} color="primary" size="small">
              <Check />
            </Fab>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(AttributeComponent);
