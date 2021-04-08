import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigation from './components/navigation/Navigation';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import './App.css';

function App() {

  const size = 400;

  const [selectedDate, setSelectedDate] = useState(null);

  const selectDate = (date) => {
    setSelectedDate(date);
  }

  return (
    <div className='o-container font-face-joystix u--red'>
    <Router>
      <Header />
      <Navigation />
        <Switch>
          <Route path="/home">
            eooo
          </Route>
          <Route path="/users">
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
