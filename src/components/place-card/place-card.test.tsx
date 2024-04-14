import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Route, Routes} from 'react-router-dom';

import PlaceCard from './place-card';
import {ApiRoute, AppRoute, AuthorizationStatus} from '../../const';
import {updateFavoriteOfferAction} from '../../store/api-actions';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {extractActionsTypes, getMockOffer, getMockStore} from '../../utils/mock-utils';

describe('Component: PlaceCard', () => {
  const offer = getMockOffer(true);
  const handlePlaceCardMouseOver = vi.fn();
  const status = offer.isFavorite ? 0 : 1;
  const title = 'Login page';

  it('should render PlaceCard component', () => {
    const withHistoryComponent = withHistory(<PlaceCard offer={offer} />);
    const {withStoreComponent} = withStore(withHistoryComponent, {
      USER: {user: null, authorizationStatus: AuthorizationStatus.Auth}
    });

    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
  });

  it('should dispatch "updateFavoriteOfferAction", when user change isFavorite status', async() => {
    const withHistoryComponent = withHistory(<PlaceCard offer={offer} />);
    const {withStoreComponent, mockAxiosAdapter, mockStore} = withStore(withHistoryComponent, getMockStore({
      USER: {user: null, authorizationStatus: AuthorizationStatus.Auth}
    }));
    mockAxiosAdapter.onPost(`${ApiRoute.FAVORITE}/${offer.id}/${status}`).reply(200, offer);

    render(withStoreComponent);

    await userEvent.click(screen.getByRole('button'));
    const actionsType = extractActionsTypes(mockStore.getActions());

    expect(actionsType).toEqual([
      updateFavoriteOfferAction.pending.type,
      updateFavoriteOfferAction.fulfilled.type
    ]);
  });

  it('should redirect to login route, when user change isFavorite status, but he not authorized', async() => {
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.LOGIN} element={<span>{title}</span>} />
        <Route path={AppRoute.HOME} element={<PlaceCard offer={offer} />} />
      </Routes>
    );
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should redirect to offer route, when user click offer', async() => {
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.OFFER_ID} element={<span>{offer.title}</span>} />
        <Route path={AppRoute.HOME} element={<PlaceCard offer={offer} />} />
      </Routes>
    );
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    await userEvent.click(screen.getByText(offer.title));

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });

  it('should onMouseOver called, when user pointed at the card', () => {
    const withHistoryComponent = withHistory(
      <PlaceCard
        offer={offer}
        onMouseOver={handlePlaceCardMouseOver}
      />
    );
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    fireEvent.mouseOver(screen.getByText(offer.title));

    expect(handlePlaceCardMouseOver).toBeCalled();
  });
});
