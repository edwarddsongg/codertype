import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages';
import Code from './pages/code';
import Standings from './pages/standings';
import SignUp from './pages/signup';
import Contact from './pages/contact';
import Header from './components/Header'

function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/:page' component={Header} />
        <Route exact path='/' component={Header} />
        <Route exact path='/home'  component={Home} />
        <Route exact path='/code' component={Code} />
        <Route exact path='/standings' component={Standings} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/sign-up' component={SignUp} />
      </Router>
    </div>
  );
}

export default App;