import React from "react";
import ReactDOM from "react-dom";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import green from "@mui/material/colors/green";
import lightGreen from "@mui/material/colors/lightGreen";
import "index.css";
import App from "App";
import reportWebVitals from "reportWebVitals";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: green,
    secondary: lightGreen,
    text: {
      disabled: "rgba(0, 0, 0, 0.2)"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "outlined"
      }
    },
    MuiFormControl: {
      defaultProps: {
        variant: "outlined"
      },
      styleOverrides: {
        root: {
          marginRight: "20px",
          marginBottom: "20px"
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        InputLabelProps: {
          shrink: true
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          margin: "40px",
          padding: "20px"
        }
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
