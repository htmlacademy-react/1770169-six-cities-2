import {Offers} from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';
import { AuthorizationStatus } from '../../const';

type PlaceListProps = {
  offers: Offers;
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
  placeCardClassName?: string;
  imageWrapperClassName?: string;
  cardInfoClassName?: string;
  listClassName?: string;
}

const PlaceList = (
  {
    offers,
    authorizationStatus,
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
        placeCardClassName={placeCardClassName}
        imageWrapperClassName={imageWrapperClassName}
        cardInfoClassName={cardInfoClassName}
        key={offer.id}
      />
    ))}
  </div>
);


export default PlaceList;
