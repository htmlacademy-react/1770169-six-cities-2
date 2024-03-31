import {datatype, internet, lorem, image, address, commerce} from 'faker';
import {getRandomElement} from './app-utils';
import {cities, housing} from '../const';
import {Locations} from '../types/app-type';

export const getMockComment = () => ({
  id: datatype.uuid(),
  date: datatype.datetime().toString(),
  user: {
    name: internet.userName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean()
  },
  comment: lorem.paragraph(),
  rating: datatype.number(5)
});

export const getMockOffer = (isFavorite = datatype.boolean()) => {
  const city: Locations[number] = getRandomElement(cities);
  const offerType = getRandomElement(Object.values(housing));
  const latitude = Number(address.latitude());
  const longitude = Number(address.longitude());

  return {
    id: datatype.uuid(),
    title: lorem.paragraph(),
    type: offerType ,
    price: Number(commerce.price()),
    city: {
      name: city.name,
      location: {
        latitude,
        longitude,
        zoom: 8
      }
    },
    location: {
      latitude,
      longitude,
      zoom: 8
    },
    isFavorite,
    isPremium: datatype.boolean(),
    rating: datatype.number(5),
    previewImage: image.imageUrl()
  };
};

export const getMockExtendedOffer = () => {
  const city: Locations[number] = getRandomElement(cities);
  const offerType = getRandomElement(Object.values(housing));
  const latitude = Number(address.latitude());
  const longitude = Number(address.longitude());

  return {
    id: datatype.uuid(),
    title: lorem.paragraph(),
    type: offerType,
    price: Number(commerce.price()),
    city: {
      name: city.name,
      location: {
        latitude,
        longitude,
        zoom: 8
      }
    },
    location: {
      latitude,
      longitude,
      zoom: 8
    },
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number(5),
    description: lorem.paragraph(),
    bedrooms: datatype.number(5),
    goods: datatype.array(),
    host: {
      name: internet.userName(),
      avatarUrl: internet.avatar(),
      isPro: datatype.boolean()
    },
    images: [image.imageUrl()],
    maxAdults: datatype.number(5)
  };
};
