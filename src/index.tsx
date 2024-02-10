import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const PLACE_COUNT = 312;
const FAVORITE_COUNT = 2;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placeCount={PLACE_COUNT} favorites={FAVORITE_COUNT} />
  </React.StrictMode>
);
