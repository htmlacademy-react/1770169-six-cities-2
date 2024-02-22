import {MouseEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Offer} from '../../types/offer-type';
import {getRatingPercent} from '../utils/app-utils';
import {AppRoute, AuthorizationStatus, housing} from '../../const';

type PlaceCardProps = {
  offer: Offer;
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
  placeCardClassName?: string;
  imageWrapperClassName?: string;
  cardInfoClassName?: string;
};

const PlaceCard = (
  {
    offer,
    authorizationStatus,
    placeCardClassName = 'cities__card place-card',
    imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper',
    cardInfoClassName = 'place-card__info'
  }: PlaceCardProps) => {
  const {
    id,
    title,
    type,
    price,
    previewImage,
    isPremium,
    isFavorite,
    rating
  } = offer;
  const [isBookmark, setIsBookmark] = useState(isFavorite);
  const [, setActiveCard] = useState('');
  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      return setIsBookmark((prevState) => !prevState);
    }
    return navigate(AppRoute.LOGIN);
  };
  const handlePlaceCardMouseOver = (evt: MouseEvent) => {
    const {cardId} = (evt.target as HTMLElement).dataset;

    if (cardId) {
      setActiveCard(cardId);
    }
  };

  return (
    <article className={placeCardClassName} onMouseOver={handlePlaceCardMouseOver}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={imageWrapperClassName}>
        <a href="#">
          <img
            className="place-card__image"
            data-card-id={id}
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className={cardInfoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{`€${price}`}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isBookmark ? 'place-card__bookmark-button--active' : ''} button`}
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
            <span style={{width: getRatingPercent(rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{housing[type]}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
