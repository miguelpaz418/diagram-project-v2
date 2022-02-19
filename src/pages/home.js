import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/logoHome.svg";
import { Link } from "react-router-dom";
//MUI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    marginTop: "1rem",
    alignItems: "center"
  },
  containerButton: {
    textAlign: "center"
  },
  button: {
    position: "relative",
    margin: "10px auto 10px auto"
  },
  form: {
    margin: "0 auto",
    padding: 40,
    backgroundColor: "white"
  },
  image: {
    margin: "10px auto 10px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  biscuaIcon: {
    height: "350px",
    paddingBottom: 20
  }
});

class home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.form}
          item
          xs={12}
          sm={10}
          lg={10}
        >
          <img src={AppIcon} alt="Icon" className={classes.biscuaIcon} />
          <Typography variant="body1">
            La arquitectura de información es un proceso que permite definir y
            caracterizar todos los elementos que componen una interfaz, Bisqua
            es una herramienta de software que soporta su construcción de forma
            colaborativa entre todos los miembros del equipo de trabajo.
          </Typography>
          <Grid container spacing={1} className={classes.container}>
            <Grid item xs={6}>
              <Typography variant="body1">
                Si tienes una cuenta de gmail o ya te registraste puedes usar
                Bisqua ingresando aqui{" "}
                <span role="img" aria-label="hand">
                  👇
                </span>
              </Typography>
              <div className={classes.containerButton}>
                <Link to="/login">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                Si no tienes una cuenta puedes registrarte en Bisqua ingresando
                en el siguiente enlace{" "}
                <span role="img" aria-label="hand">
                  👇
                </span>
              </Typography>
              <div className={classes.containerButton}>
                <Link to="/signup">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Registrate
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(home);
