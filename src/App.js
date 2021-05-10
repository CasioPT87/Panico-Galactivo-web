import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from './components/navigation/Navigation';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Aliens from './pages/aliens/Aliens';
import './App.css';

function App() {

  return (
    <div className='container font-face-joystix u--red'>
    <Router>
      <Header />
      <Navigation />
        <Switch>
          <Route path="/aliens">
            <Aliens />
          </Route>
          <Route path="/music">
            que
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
