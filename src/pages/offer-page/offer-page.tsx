import {ChangeEvent, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {features} from '../../const';
import Layout from '../../components/layout/layout';
import Rating from '../../components/rating/rating';
import ReviewList from '../../components/review-list/review-list';
import PlaceList from '../../components/place-list/place-list';
import {Offers} from '../../types/offer-type';
import {getOfferById} from '../../components/utils/app';

type OfferPageProps = {
  offers: Offers;
};

const OfferPage = ({offers}: OfferPageProps) => {
  const {id} = useParams();
  const {images} = getOfferById(offers, id);
  const [, setRatingValue] = useState<null | string>(null);
  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => setRatingValue(evt.target.value);

  return (
    <Layout containerClassName='page' mainClassName='page__main page__main--offer'>
      <Helmet>
        <title>6 cities | Beautiful &amp; luxurious studio at great location</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {images.map((image) => (
              <div className="offer__image-wrapper" key={image}>
                <img
                  className="offer__image"
                  src={image}
                  alt="Photo studio"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              <span>Premium</span>
            </div>
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                Beautiful &amp; luxurious studio at great location
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: '80%' }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">4.8</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">Apartment</li>
              <li className="offer__feature offer__feature--bedrooms">
                3 Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max 4 adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€120</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {features.map(({id, name}) => <li key={id} className="offer__inside-item">{name}</li>)}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src="img/avatar-angelina.jpg"
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">Angelina</span>
                <span className="offer__user-status">Pro</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  A quiet cozy and picturesque that hides behind a a river by the
                  unique lightness of Amsterdam. The building is green and from 18th
                  century.
                </p>
                <p className="offer__text">
                  An independent House, strategically located between Rembrand
                  Square and National Opera, but where the bustle of the city comes
                  to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews · <span className="reviews__amount">1</span>
              </h2>
              <ReviewList />
              <form className="reviews__form form" action="#" method="post">
                <label className="reviews__label form__label" htmlFor="review">
                  Your review
                </label>
                <Rating onChange={handleRatingChange} />
                <textarea
                  className="reviews__textarea form__textarea"
                  id="review"
                  name="review"
                  placeholder="Tell how was your stay, what you like and what can be improved"
                />
                <div className="reviews__button-wrapper">
                  <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least
                    <b className="reviews__text-amount">50 characters</b>.
                  </p>
                  <button
                    className="reviews__submit form__submit button"
                    type="submit"
                    disabled
                  >
                    Submit
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <section className="offer__map map" />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlaceList
            offers={offers}
            listClassName='near-places__list places__list'
            placeCardClassName='near-places__card place-card'
            imageWrapperClassName='near-places__image-wrapper place-card__image-wrapper'
          />
        </section>
      </div>
    </Layout>
  );
};

export default OfferPage;
