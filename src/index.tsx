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

const localizedLanguages = [
  { name: "English", code: "en" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" }
];

const localizeInit = {
  languages: localizedLanguages,
  translation: translations,
  options: {
    renderToStaticMarkup,
    defaultLanguage:
      localizedLanguages.find(l => l.code === navigator.language) !== undefined
        ? navigator.language
        : "es"
  }
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizeProvider initialize={localizeInit}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
      </LocalizeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
