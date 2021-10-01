import { Route, Switch } from "react-router";
import Donation from "./screens/Donation";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Donation} />
      </Switch>
    </div>
  );
}

export default App;
