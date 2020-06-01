import React from 'react';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/Settings';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LITEAppBar from './components/LITEAppBar';

function AppRouter() {
  return (
    <>
    <LITEAppBar />
    <Router>
      <div className='App-header'>
        <Route path="/" exact component = {MainPage} />
        <Route path="/settings" exact component = {SettingsPage} />
      </div>
    </Router>
    </>
  )
}

export default AppRouter;
