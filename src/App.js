import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import Code from './pages/code';
import Standings from './pages/standings';
import SignUp from './pages/signup';
import Contact from './pages/contact';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/code' component={Code} />
        <Route path='/standings' component={Standings} />
        <Route path='/contact' component={Contact} />
        <Route path='/sign-up' component={SignUp} />
      </Switch>
    </Router>
  );
}
  
export default App;