import React from "react";
import style from "styled-components";
import ActionIcon from "./ActionIcon";
import ChipIconAction from "../chipIconsAction";
//Icons
import { Close } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Chip from "@material-ui/core/Chip";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";

import type { DiagComponentProps } from "react-flow-diagram";

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

const ActionStyle = style.div`
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: .5rem;
  border: 3px dotted #000;
`;

const Name = style.span`
  flex: auto;
  padding-top: 0.25rem;
`;

export type ActionProps = DiagComponentProps & {
  name: string
};

const Action = (props: ActionProps) => (
  <ActionStyle width={props.model.width} height={props.model.height}>
    <Name>
      <ActionIcon pathIcon={props.model.name} />
    </Name>
  </ActionStyle>
);

/*
 * Container
 * ==================================== */

type ActionComponentProps = DiagComponentProps;
type ActionComponentState = {
  name: string
};
class ActionComponent extends React.PureComponent<
  ActionComponentProps,
  ActionComponentState
> {
  state = {
    name: this.props.model.name,
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = event => {
    this.props.setName({
      id: this.props.model.id,
      name: event.currentTarget.id
    });
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    const actions = [
      "desplazar",
      "agarrar",
      "lanzar",
      "levantar",
      "presionar",
      "gestualizar",
      "soltar",
      "retroalimentar",
      "leer",
      "girar",
      "introducir",
      "adherir",
      "arrastrar",
      "ajustar"
    ];
    return (
      <>
        <div onDoubleClick={this.handleOpen}>
          <Action
            {...this.props}
            name={this.state.name}
            tooltip={this.state.type}
          />
        </div>
        <Dialog open={this.state.open} maxWidth="xs" onClose={this.handleClose}>
          <DialogTitle>Selecciona una acción</DialogTitle>
          <DialogContent>
            {actions.map(action => {
              return (
                <Chip
                  key={action}
                  id={action}
                  avatar={<ChipIconAction pathIcon={action} />}
                  label={action}
                  onClick={this.handleClick}
                  className={classes.chip}
                />
              );
            })}
          </DialogContent>
          <DialogActions>
            <Fab onClick={this.handleClose} color="secondary" size="small">
              <Close />
            </Fab>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(ActionComponent);
