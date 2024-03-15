import {MouseEvent, useState} from 'react';

import classNames from 'classnames';
import {Link, useNavigate} from 'react-router-dom';

import {AppRoute, AuthorizationStatus, housing} from '../../const';
import {Offer} from '../../types/offer-type';
import {getRatingPercent} from '../../utils/app-utils';
import {Authorization} from '../../types/app-type';


type PlaceCardProps = {
  offer: Offer;
  authorizationStatus: Authorization;
  onMouseOver?: (evt: MouseEvent) => void;
  placeCardClassName?: string;
  imageWrapperClassName?: string;
  cardInfoClassName?: string;
};

const PlaceCard = (
  {
    offer,
    authorizationStatus,
    onMouseOver,
    placeCardClassName = 'cities__card place-card',
    imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper',
    cardInfoClassName = 'place-card__info'
  }: PlaceCardProps) => {
  const [isBookmark, setIsBookmark] = useState(offer.isFavorite);
  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      return setIsBookmark((prevState) => !prevState);
    }
    return navigate(AppRoute.LOGIN);
  };

  return (
    <article className={placeCardClassName} onMouseOver={onMouseOver}>
      {offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={imageWrapperClassName}>
        <Link to={`${AppRoute.OFFER}/${offer.id}`}>
          <img
            className="place-card__image"
            data-card-id={offer.id}
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cardInfoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{`€${offer.price}`}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={classNames(
              'place-card__bookmark-button',
              {'place-card__bookmark-button--active': isBookmark},
              'button'
            )}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{isBookmark ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingPercent(offer.rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{housing[offer.type]}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
