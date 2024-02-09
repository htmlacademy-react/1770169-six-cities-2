import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const PLACE_COUNT = 312;
const BLOCK_NAME = 'cities';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placeCount={PLACE_COUNT} blockName={BLOCK_NAME} />
  </React.StrictMode>
);
