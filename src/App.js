import { Redirect, Route, Switch } from "react-router";
import Catering from "./screens/Catering";
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
          <Route path="/donations/:productId" component={Catering} />
          <Redirect
            from="/"
            to="/donations/895892fa-127e-4dbf-941e-3e4486a834af"
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
