import React, { Component } from "react";
import PropTypes from "prop-types";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
//Redux
import { submitComment } from "../../redux/actions/dataActions";
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.formTheme
});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ body: "" });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitComment(this.props.diagramId, this.props.projectId, {
      body: this.state.body
    });
  };
  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAling: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comentar"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.TextField}
          />
          <Button
            size="small"
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Enviar
          </Button>
        </form>
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  diagramId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ui: state.ui,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { submitComment }
)(withStyles(styles)(CommentForm));
