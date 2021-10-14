export const generalTheme = {
  palette: {
    primary: {
      main: "#09476E",
      light: "#3a6b8b",
      dark: "#06314d",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#acacac",
      light: "#bcbcbc",
      dark: "#787878",
      contrastText: "#000000"
    }
  },
  formTheme: {
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: "center",
      margin: "0 auto",
      padding: 0,
      backgroundColor: "white",
      boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)"
    },
    image: {
      margin: "10px auto 10px auto"
    },
    pageTitle: {
      margin: "10px auto 10px auto"
    },
    textField: {
      margin: "10px auto 10px auto"
    },
    button: {
      margin: "10px auto 10px auto",
      position: "relative"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10
    },
    progress: {
      position: "absolute"
    },
    link: {
      color: "#06314d"
    },
    googleButton: {
      marginTop: 20,
      position: "relative",
      marginBottom: 10,
      color: "#fff",
      backgroundColor: "#E46154",
      "&:hover": {
        backgroundColor: "#9f433a"
      }
    },
    iconGoogle: {
      marginRight: 10,
      height: "30px"
    },
    divider: {
      //backgroundColor: "black",
      height: "2px",
      margin: 10
    }
  },
  profileTheme: {
    paper: {
      padding: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "60%"
        }
      },
      "& .profile-image": {
        width: 150,
        height: 150,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          //color: theme.palette.primary.main //verificar que pasa con el colorTheme
          color: "#00bcd4"
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px"
      }
    }
  }
};
