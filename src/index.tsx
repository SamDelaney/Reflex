import React from 'react';
import ReactDOM from 'react-dom';
import {renderToStaticMarkup} from 'react-dom/server'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'; 

import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import translations from './translations.json';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store";

export const localizedLanguages = [
  { name: "English", code: "en" },
  { name: "Español", code: "es" },
  { name: "Français", code: "fr" }
];

//check for default browser, resort to English if none found
const defaultLang = localizedLanguages.find(l => l.code === navigator.language) !== undefined
    ? navigator.language
    : "en";

const localizeInit = {
  languages: localizedLanguages,
  translation: translations,
  options: {
    renderToStaticMarkup,
    defaultLanguage:
      //check for saved language, then default
      localStorage.getItem("language") || defaultLang 
  }
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LocalizeProvider initialize={localizeInit}>
        <App />
      </LocalizeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
