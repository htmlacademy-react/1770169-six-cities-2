import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const PLACE_COUNT = 312;
const FAVORITE_COUNT = 2;
const IMAGES = ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placeCount={PLACE_COUNT} favorites={FAVORITE_COUNT} images={IMAGES} />
  </React.StrictMode>
);
