import React from 'react';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/Settings';
import History from './pages/History';
import FormatStyles from './pages/Styles';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import LITEAppBar from './components/LITEAppBar';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6B4060"
    }
  }
})

function AppRouter() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HashRouter basename='/'>
          <LITEAppBar />
          <div className='App-header'>
            <Route path="/" exact component = {MainPage} />
            <Route path="/settings" exact component = {SettingsPage} />
            <Route path="/history" exact component = {History} />
            <Route path="/styles" exact component = {FormatStyles} />
          </div>
        </HashRouter>
      </ThemeProvider>
    </>
  )
}

export default AppRouter;
