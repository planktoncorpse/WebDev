import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './styles/App.css';
import ParkingGarages from "./components/ParkingGarages";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Define the route for the homepage */}
          <Route path="/" exact component={HomePage} />
          {/* You can add more routes here for other pages if needed */}
        </Switch>

        {/* Parking Garages component will always be displayed */}
        <ParkingGarages />
      </div>
    </Router>
  );
}

export default App;
