import {MutableRefObject, useEffect, useRef, useState} from 'react';

import {LatLng, Map, TileLayer} from 'leaflet';

import {MAP_ZOOM} from '../const';
import {Location} from '../types/offer-type';

const useMap = (mapRef: MutableRefObject<HTMLElement | null>, location: Location) => {
  const [currentMap, setCurrentMap] = useState<null | Map>(null);
  const isRenderedRef = useRef(false);

  const {latitude, longitude} = location;

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const map = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: MAP_ZOOM
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
      currentMap.flyTo(new LatLng(latitude, longitude));
      currentMap.invalidateSize();
    }
  }, [mapRef, location]);

  return currentMap;
};

export {useMap};
