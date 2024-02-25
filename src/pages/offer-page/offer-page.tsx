import {useState} from 'react';

import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';
import {useNavigate, useParams} from 'react-router-dom';

import Layout from '../../components/layout/layout';
import PlaceList from '../../components/place-list/place-list';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import {getOfferById, getRatingPercent} from '../../components/utils/app-utils';
import {AppRoute, AuthorizationStatus, housing, MAX_IMAGES_VIEW} from '../../const';
import {Comments} from '../../types/comment-type';
import {ExtendedOffer, Offers} from '../../types/offer-type';

type OfferPageProps = {
  offers: Offers;
  comments: Comments;
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
};

type UseParams = {
  id: string;
}

const OfferPage = ({offers, comments, authorizationStatus}: OfferPageProps) => {
  const {id} = useParams() as UseParams;
  const {
    title,
    description,
    type,
    price,
    goods,
    host,
    images,
    isPremium,
    isFavorite,
    rating,
    bedrooms,
    maxAdults
  } = getOfferById(offers, id) as ExtendedOffer;
  const [isBookmark, setIsBookmark] = useState(isFavorite);
  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      return setIsBookmark((prevState) => !prevState);
    }
    return navigate(AppRoute.LOGIN);
  };

  return (
    <Layout containerClassName='page' mainClassName='page__main page__main--offer'>
      <Helmet>
        <title>6 cities | {title}</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {images.slice(0, MAX_IMAGES_VIEW).map((image) => (
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
            {
              isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{title}</h1>
              <button
                className={classNames(
                  'offer__bookmark-button',
                  {'offer__bookmark-button--active': isBookmark},
                  'button'
                )}
                type="button"
                onClick={handleBookmarkClick}
              >
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">{isBookmark ? 'In bookmarks' : 'To bookmarks'}</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: getRatingPercent(rating)}} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{housing[type]}</li>
              <li className="offer__feature offer__feature--bedrooms">{`${bedrooms} Bedrooms`}</li>
              <li className="offer__feature offer__feature--adults">{`Max ${maxAdults} adults`}</li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">{`€${price}`}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {goods.map((good) => <li key={good} className="offer__inside-item">{good}</li>)}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={classNames(
                  'offer__avatar-wrapper',
                  {'offer__avatar-wrapper--pro': host.isPro},
                  'user__avatar-wrapper'
                )}
                >
                  <img
                    className="offer__avatar user__avatar"
                    src={host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{host.name}</span>
                <span className="offer__user-status">{host.isPro ? 'Pro' : ''}</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">{description}</p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews · <span className="reviews__amount">{comments.length}</span>
              </h2>
              <ReviewList reviews={comments} />
              {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
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
            authorizationStatus={authorizationStatus}
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
