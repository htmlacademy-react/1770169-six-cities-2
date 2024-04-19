import {useEffect, useRef} from 'react';

import {Icon, layerGroup, Marker} from 'leaflet';

import {IconPath} from '../../const';
import {useMap} from '../../hooks/use-map';
import {ExtendedOffer, Offer} from '../../types/offer-type';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: (Offer | ExtendedOffer)[];
  currentCard: string;
};

const defaultIcon = new Icon({
  iconUrl: IconPath.DEFAULT_ICON_PATH,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentIcon = new Icon({
  iconUrl: IconPath.CURRENT_ICON_PATH,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const Map = ({offers, currentCard}: MapProps) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0].city.location);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const {latitude, longitude} = offer.location;
        const marker = new Marker({
          lat: latitude,
          lng: longitude
        });
        marker.setIcon(currentCard === offer.id ? currentIcon : defaultIcon).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, currentCard]);


  return <div style={{height: '100%', maxWidth: '1146px', margin: '0 auto'}} ref={mapRef} data-testid="map"></div>;
};

export default Map;
