import {createTheme} from "@mui/material";

const colorTheme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#9DBC98",
        dark: "#638889",
        contrastText: "#fff"
      },
      secondary: {
        light: "#fcf6e8",
        main: "#F9EFDB",
        dark: "#EBD9B4",
        contrastText: "#000"
      }
    }
  });

  export default colorTheme;