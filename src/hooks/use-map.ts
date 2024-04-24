import {MutableRefObject, useEffect, useRef, useState} from 'react';

import {LatLng, Map, TileLayer} from 'leaflet';

import {Location} from '../types/offer-type';

const useMap = (mapRef: MutableRefObject<HTMLElement | null>, location: Location) => {
  const [currentMap, setCurrentMap] = useState<null | Map>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const map = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom
      });

      map.addLayer(new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ));

      setCurrentMap(map);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  useEffect(() => {
    if (currentMap !== null) {
      currentMap.flyTo(new LatLng(location.latitude, location.longitude));
      currentMap.invalidateSize();
    }
  }, [mapRef, location, currentMap]);

  return currentMap;
};

export {useMap};
