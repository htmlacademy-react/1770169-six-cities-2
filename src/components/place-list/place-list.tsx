import {MouseEvent} from 'react';

import {AuthorizationStatus} from '../../const';
import {Offer} from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';

type PlaceListProps = {
  offers: Offer[];
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
  onMouseOver?: (evt: MouseEvent) => void;
  placeCardClassName?: string;
  imageWrapperClassName?: string;
  cardInfoClassName?: string;
  listClassName?: string;
}

const PlaceList = (
  {
    offers,
    authorizationStatus,
    onMouseOver,
    placeCardClassName,
    imageWrapperClassName,
    cardInfoClassName,
    listClassName = 'cities__places-list places__list tabs__content'
  }: PlaceListProps
) => (
  <div className={listClassName}>
    {offers.map((offer) => (
      <PlaceCard
        offer={offer}
        authorizationStatus={authorizationStatus}
        onMouseOver={onMouseOver}
        placeCardClassName={placeCardClassName}
        imageWrapperClassName={imageWrapperClassName}
        cardInfoClassName={cardInfoClassName}
        key={offer.id}
      />
    ))}
  </div>
);


export default PlaceList;
