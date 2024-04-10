import {datatype, internet, lorem, image, address, commerce} from 'faker';

import {Action} from '@reduxjs/toolkit';

import {getRandomElement} from './app-utils';
import {AuthorizationStatus, cities, housing, sortTypes} from '../const';
import {Store} from '../types/store-type';

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
  const offerType = getRandomElement(Object.values(housing));
  const latitude = Number(address.latitude());
  const longitude = Number(address.longitude());

  return {
    id: datatype.uuid(),
    title: lorem.paragraph(),
    type: offerType ,
    price: Number(commerce.price()),
    city: {
      name: cities[0].name,
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

export const getMockExtendedOffer = (isFavorite = datatype.boolean()) => {
  const offerType = getRandomElement(Object.values(housing));
  const latitude = Number(address.latitude());
  const longitude = Number(address.longitude());

  return {
    id: datatype.uuid(),
    title: lorem.paragraph(),
    type: offerType,
    price: Number(commerce.price()),
    city: {
      name: cities[0].name,
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
    description: lorem.paragraph(),
    bedrooms: datatype.number(5),
    goods: [datatype.string()],
    host: {
      name: internet.userName(),
      avatarUrl: internet.avatar(),
      isPro: datatype.boolean()
    },
    images: [image.imageUrl()],
    maxAdults: datatype.number(5)
  };
};

export const getMockUser = () => ({
  name: internet.userName(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: datatype.string()
});

export const getMockStore = (initialState: Partial<Store> = {}) => ({
  OFFER: {offer: null, isLoading: false},
  OFFERS: {
    offers: [],
    location: cities[0].name,
    sortType: sortTypes[0].name,
    isLoading: false
  },
  FAVORITE_OFFERS: {favoriteOffers: [], isLoading: false},
  NEARBY_OFFERS: {nearbyOffers: [], isLoading: false},
  COMMENTS: {comments: [], isLoading: false},
  USER: {user: null, authorizationStatus: AuthorizationStatus.NoAuth},
  ...initialState
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);
