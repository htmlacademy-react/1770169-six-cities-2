import {MouseEvent} from 'react';

import {Offer} from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';

type PlaceListProps = {
  offers: Offer[];
  onMouseOver?: (evt: MouseEvent) => void;
  placeCardClassName?: string;
  imageWrapperClassName?: string;
  cardInfoClassName?: string;
  listClassName?: string;
}

const PlaceList = (
  {
    offers,
    onMouseOver,
    placeCardClassName,
    imageWrapperClassName,
    cardInfoClassName,
    listClassName = 'cities__places-list places__list tabs__content'
  }: PlaceListProps
) => (
  <div className={listClassName} data-testid="places-list">
    {offers.map((offer) => (
      <PlaceCard
        offer={offer}
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
