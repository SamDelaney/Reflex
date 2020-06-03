import React from 'react';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/Settings';
import History from './pages/History';
import FormatStyles from './pages/Styles';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import LITEAppBar from './components/LITEAppBar';

function AppRouter() {
  return (
    <>
      <HashRouter basename='/'>
        <LITEAppBar />
        <div className='App-header'>
          <Route path="/" exact component = {MainPage} />
          <Route path="/settings" exact component = {SettingsPage} />
          <Route path="/history" exact component = {History} />
          <Route path="/styles" exact component = {FormatStyles} />
        </div>
      </HashRouter>
    </>
  )
}

export default AppRouter;
