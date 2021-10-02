import { Route, Switch } from "react-router";
import Donation from "./screens/Donation";
import PageNotFound from "./screens/PageNotFound";
import { CustomToastContainer } from "./utils/CustomToast";

function App() {
  return (
    <div className="App">
      <CustomToastContainer />
      <Switch>
        <Route path="/" exact component={Donation} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
