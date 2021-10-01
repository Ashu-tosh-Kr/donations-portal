import { Route, Switch } from "react-router";
import Donation from "./screens/Donation";
import Payment from "./screens/Payment";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Donation} />
        <Route path="/payment" exact component={Payment} />
      </Switch>
    </div>
  );
}

export default App;
