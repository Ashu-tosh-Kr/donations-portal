import { Route, Switch } from "react-router";
import Donation from "./screens/Donation";
import PageNotFound from "./screens/PageNotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Donation} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
