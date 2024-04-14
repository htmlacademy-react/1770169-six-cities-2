import {renderHook} from '@testing-library/react';
import {address, datatype} from 'faker';
import {Map} from 'leaflet';

import {useMap} from './use-map';


describe('Hook: useMap', () => {
  it('should return new Map', () => {
    const location = {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(8)
    };
    const ref = {current: document.createElement('div')};

    const {result} = renderHook(() => useMap(ref, location));

    expect(result.current).toBeInstanceOf(Map);
  });
});
