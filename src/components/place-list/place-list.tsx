import {useState} from 'react';
import {Offers} from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';

type PlaceListProps = {
  offers: Offers;
  placeCardClassName?: string;
  imageWrapperClassName?: string;
  cardInfoClassName?: string;
  listClassName?: string;
}

const PlaceList = (
  {
    offers,
    placeCardClassName,
    imageWrapperClassName,
    cardInfoClassName,
    listClassName = 'cities__places-list places__list tabs__content'
  }: PlaceListProps
) => {
  const [activeCard, setActiveCard] = useState('');

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          placeCardClassName={placeCardClassName}
          imageWrapperClassName={imageWrapperClassName}
          cardInfoClassName={cardInfoClassName}
          key={offer.id}
        />
      ))}
    </div>
  );
};


export default PlaceList;
