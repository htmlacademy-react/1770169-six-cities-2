type PlaceCardProps = {
  placeCardClassName?: string;
  imageWrapperClassName?: string;
  cardInfoClassName?: string;
};

const PlaceCard = (
  {
    placeCardClassName = 'cities__card place-card',
    imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper',
    cardInfoClassName = 'place-card__info'
  }: PlaceCardProps) => (
  <article className={placeCardClassName}>
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
    <div className={imageWrapperClassName}>
      <a href="#">
        <img
          className="place-card__image"
          src="img/apartment-01.jpg"
          width={260}
          height={200}
          alt="Place image"
        />
      </a>
    </div>
    <div className={cardInfoClassName}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€120</b>
          <span className="place-card__price-text">/&nbsp;night</span>
        </div>
        <button
          className="place-card__bookmark-button button"
          type="button"
        >
          <svg
            className="place-card__bookmark-icon"
            width={18}
            height={19}
          >
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: '80%' }} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">
          Beautiful &amp; luxurious apartment at great location
        </a>
      </h2>
      <p className="place-card__type">Apartment</p>
    </div>
  </article>
);

export default PlaceCard;
