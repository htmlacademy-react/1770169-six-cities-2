import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer-type';
import {getRatingPercent} from '../utils/app';
import {toCapitalize} from '../utils/helpers';
import {useState} from 'react';

type PlaceCardProps = {
  offer: Offer;
  placeCardClassName?: string;
  imageWrapperClassName?: string;
  cardInfoClassName?: string;
};

const PlaceCard = (
  {
    offer,
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
  const handleBookmarkClick = () => setIsBookmark((prevState) => !prevState);

  return (
    <article className={placeCardClassName}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={imageWrapperClassName}>
        <Link to={`offer/${id}`} >
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
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
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{toCapitalize(type)}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
