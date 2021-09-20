import React from 'react';
import './App.css';
import Home from './components/Home';
import Favorites from './components/Favorites';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
       <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/favorites' exact component={Favorites} />
      </Switch>
    </Router>
  );
}

export default App;