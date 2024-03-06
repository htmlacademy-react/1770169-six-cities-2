import {useEffect, useState} from 'react';

import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';
import {useNavigate, useParams} from 'react-router-dom';

import Layout from '../../components/layout/layout';
import Map from '../../components/map/map';
import PlaceList from '../../components/place-list/place-list';
import ReviewList from '../../components/review-list/review-list';
import {getRatingPercent} from '../../utils/app-utils';
import {AppRoute, AuthorizationStatus, housing, MAX_IMAGES_VIEW} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {getCommentsAction, getNearbyOffersAction, getOfferAction} from '../../store/api-actions';

type UseParams = {
  id: string;
}

const OfferPage = () => {
  const [isBookmark, setIsBookmark] = useState(false);
  const {id} = useParams() as UseParams;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offer = useAppSelector((state) => state.offer);
  const comments = useAppSelector((state) => state.comments);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOfferAction(id));
    dispatch(getCommentsAction(id));
    dispatch(getNearbyOffersAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (offer !== null) {
      setIsBookmark(offer.isFavorite);
    }
  }, [offer]);

  if (offer === null) {
    return;
  }

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      return setIsBookmark((prevState) => !prevState);
    }
    return navigate(AppRoute.LOGIN);
  };

  return (
    <Layout containerClassName='page' mainClassName='page__main page__main--offer'>
      <Helmet>
        <title>6 cities | {offer.title}</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer.images.slice(0, MAX_IMAGES_VIEW).map((image) => (
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
              offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offer.title}</h1>
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
                <span style={{width: getRatingPercent(offer.rating)}} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{housing[offer.type]}</li>
              <li className="offer__feature offer__feature--bedrooms">{`${offer.bedrooms} Bedrooms`}</li>
              <li className="offer__feature offer__feature--adults">{`Max ${offer.maxAdults} adults`}</li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">{`€${offer.price}`}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offer.goods.map((good) => <li key={good} className="offer__inside-item">{good}</li>)}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={classNames(
                  'offer__avatar-wrapper',
                  {'offer__avatar-wrapper--pro': offer.host.isPro},
                  'user__avatar-wrapper'
                )}
                >
                  <img
                    className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{offer.host.name}</span>
                <span className="offer__user-status">{offer.host.isPro ? 'Pro' : ''}</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">{offer.description}</p>
              </div>
            </div>
            <ReviewList
              reviews={comments}
              authorizationStatus={authorizationStatus}
              offerId={offer.id}
            />
          </div>
        </div>
        <section className="offer__map map" >
          <Map offers={[...nearbyOffers.slice(0, 3), offer]} currentCard={offer.id} />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlaceList
            offers={nearbyOffers.slice(0, 3)}
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
