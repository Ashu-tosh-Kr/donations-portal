import { Route, Switch } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Donation from "./screens/Donation";

// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       "Quicksand",
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//   },
// });

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Donation} />
      </Switch>
    </div>
    // </ThemeProvider>
  );
}

export default App;
