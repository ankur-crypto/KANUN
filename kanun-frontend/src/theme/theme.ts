import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#123B5D",
      dark: "#0D2D45",
      light: "#1A5276",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#B08D57",
      light: "#D6B878",
      dark: "#8C6E3E",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#172B3A",
      secondary: "#5E6B75",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',

    h1: {
      fontWeight: 800,
    },

    h2: {
      fontWeight: 750,
    },

    h3: {
      fontWeight: 750,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "medium",
      },
    },
  },
});

export default theme;