import React, { Component } from "react";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import LogoUnivalle from "../../images/Univalle.svg";

const styles = theme => ({
  ...theme.formTheme,
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: "10px 0",
    marginTop: 16,
    width: "100%",
    position: "fixed",
    bottom: 0,
    color: theme.palette.primary.contrastText
  },
  credits: {
    cursor: "pointer"
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#000"
  },
  emojiDev: {
    fontSize: 12
  },
  teacher: {
    marginBottom: 10
  },
  univalleIcon: {
    height: "40px"
  }
});

class Footer extends Component {
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
  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <footer className={classes.footer}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              onClick={this.handleOpen}
              className={classes.credits}
            >
              <span role="img" aria-label="megaphone">
                📣
              </span>{" "}
              Créditos de Desarrollo - {new Date().getFullYear()}
            </Typography>
          </Grid>
        </footer>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Créditos</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Bisqua se desarrolló con el apoyo de la Universidad del Valle y el
              grupo de investigación Camaleón de la Escuela de Ingeniería de
              Sistemas y Computación en el marco del proyecto desarrollo de una
              interfaz tangible para promover educación inclusiva entre usuarios
              videntes y no videntes.
            </Typography>
            <div className={classes.subtitle}>
              <Typography variant="h6">Investigadores:</Typography>
            </div>
            <div className={classes.teacher}>
              <Typography variant="body1">
                Javier Mauricio Reyes Vera - Profesor Departamento de Diseño –
                Universidad del Valle.
              </Typography>
            </div>
            <div className={classes.teacher}>
              <Typography variant="body1">
                Paola Johanna Rodriguez Carrillo - Profesora Escuela de
                Ingeniería de Sistemas y Computación - Universidad del Valle.
              </Typography>
            </div>
            <div className={classes.teacher}>
              <Typography variant="body1">
                Ivette Kafure Muñoz - Profesora - Universidad de Brasilia.
              </Typography>
            </div>
            <div className={classes.subtitle}>
              <Typography variant="h6">
                Grupo de apoyo para el desarrollo de software
              </Typography>
            </div>
            <div className={classes.subtitle}>
              <Typography variant="h6">Ingeniero de Desarrollo</Typography>
              <Typography variant="body1">
                <a
                  href="https://www.linkedin.com/in/maomunozz18/"
                  id="linkMaoz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    role="img"
                    aria-label="rocket"
                    className={classes.emojiDev}
                  >
                    🚀
                  </span>{" "}
                  Hector Mauricio Muñoz Ordoñez{" "}
                </a>
              </Typography>
            </div>
            <div className={classes.subtitle}>
              <Typography variant="h6">Diseño Gráfico</Typography>
              <Typography variant="body1">Marysol Córdoba Díaz</Typography>
              <Typography variant="body1">Melissa Cruz Piedrahita</Typography>
            </div>
            <div className={classes.subtitle}>
              <Typography variant="h6">
                <img
                  src={LogoUnivalle}
                  alt="Icon"
                  className={classes.univalleIcon}
                />{" "}
                Vicerrectoría Universidad del Valle
              </Typography>
            </div>
            <Typography variant="body1">
              Santiago de Cali - {new Date().getFullYear()}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="primary"
              variant="contained"
              size="small"
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
