import React from 'react';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/Settings';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import LITEAppBar from './components/LITEAppBar';

function AppRouter() {
  return (
    <>
    <LITEAppBar />
      <HashRouter basename='/'>
        <div className='App-header'>
          <Route path="/" exact component = {MainPage} />
          <Route path="/settings" exact component = {SettingsPage} />
        </div>
      </HashRouter>
    </>
  )
}

export default AppRouter;
