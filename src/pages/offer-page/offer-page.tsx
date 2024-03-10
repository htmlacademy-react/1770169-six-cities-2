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
import {selectAuthorizationStatus, selectComments, selectNearbyOffers, selectSelectedOffer} from '../../store/selectors';

type UseParams = {
  id: string;
}

const OfferPage = () => {
  const [isBookmark, setIsBookmark] = useState(false);
  const {id} = useParams() as UseParams;
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const selectedOffer = useAppSelector(selectSelectedOffer);
  const comments = useAppSelector(selectComments);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOfferAction(id));
    dispatch(getCommentsAction(id));
    dispatch(getNearbyOffersAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedOffer !== null) {
      setIsBookmark(selectedOffer.isFavorite);
    }
  }, [selectedOffer]);

  if (selectedOffer === null) {
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
        <title>6 cities | {selectedOffer.title}</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {selectedOffer.images.slice(0, MAX_IMAGES_VIEW).map((image) => (
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
              selectedOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{selectedOffer.title}</h1>
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
                <span style={{width: getRatingPercent(selectedOffer.rating)}} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{selectedOffer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{housing[selectedOffer.type]}</li>
              <li className="offer__feature offer__feature--bedrooms">{`${selectedOffer.bedrooms} Bedrooms`}</li>
              <li className="offer__feature offer__feature--adults">{`Max ${selectedOffer.maxAdults} adults`}</li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">{`€${selectedOffer.price}`}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {selectedOffer.goods.map((good) => <li key={good} className="offer__inside-item">{good}</li>)}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={classNames(
                  'offer__avatar-wrapper',
                  {'offer__avatar-wrapper--pro': selectedOffer.host.isPro},
                  'user__avatar-wrapper'
                )}
                >
                  <img
                    className="offer__avatar user__avatar"
                    src={selectedOffer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{selectedOffer.host.name}</span>
                <span className="offer__user-status">{selectedOffer.host.isPro ? 'Pro' : ''}</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">{selectedOffer.description}</p>
              </div>
            </div>
            <ReviewList
              reviews={comments}
              authorizationStatus={authorizationStatus}
              offerId={selectedOffer.id}
            />
          </div>
        </div>
        <section className="offer__map map" >
          <Map offers={[...nearbyOffers.slice(0, 3), selectedOffer]} currentCard={selectedOffer.id} />
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
