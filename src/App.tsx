import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Listen from "./pages/listen/Listen";
import Aliens from "./pages/aliens/Aliens";
import "./App.css";

function App() {
  return (
    <div data-testid='app-container' className="app-container font-face-joystix">
      <Router>
        <Header />
        <Navigation />
        <Switch>
          <Route path="/aliens" strict>
            <Aliens />
          </Route>
          <Route path="/music" strict>
            <Listen />
          </Route>
          <Route path="/" strict>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
