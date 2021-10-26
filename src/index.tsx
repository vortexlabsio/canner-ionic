import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const REACT_APP_AUTH0_DOMAIN: string = process.env.REACT_APP_AUTH0_DOMAIN || '';
const REACT_APP_AUTH0_CLIENT_ID: string = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
const REACT_APP_AUTH0_REDIRECT_URI: string = process.env.REACT_APP_AUTH0_REDIRECT_URI || '';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={REACT_APP_AUTH0_REDIRECT_URI}
    >
      <App />
    </Auth0Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
