import { Route, Switch } from "react-router";
import Donation from "./screens/Donation";
import PageNotFound from "./screens/PageNotFound";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomToastContainer } from "./utils/CustomToast";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: "#ffba08",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CustomToastContainer />
        <Switch>
          <Route path="/" exact component={Donation} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
