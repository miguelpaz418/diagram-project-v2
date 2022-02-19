import React, { Component } from "react";
import PropTypes from "prop-types";
//Components
import CustomButton from "../../util/CustomButton";
//MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
//Icons
import { Delete } from "mdi-material-ui";
//Redux
import { connect } from "react-redux";
import { deleteDiagram } from "../../redux/actions/dataActions";

class DeleteDiagram extends Component {
  state = {
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
  deleteDiagram = () => {
    this.props.deleteDiagram(this.props.diagramId, this.props.projectId);
    this.setState({
      open: false
    });
  };
  render() {
    return (
      <div>
        <CustomButton tip="Eliminar Diagrama" onClick={this.handleOpen}>
          <Delete color="secondary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Eliminar Diagrama</DialogTitle>
          <DialogContent>
            <Typography variant="h6">
              Estas seguro de que quieres eliminar este diagrama?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="primary"
              variant="contained"
              size="medium"
            >
              Cancelar
            </Button>
            <Button
              onClick={this.deleteDiagram}
              color="secondary"
              variant="contained"
              size="medium"
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteDiagram.propTypes = {
  deleteDiagram: PropTypes.func.isRequired,
  diagramId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteDiagram }
)(DeleteDiagram);
