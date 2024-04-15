import {render, screen} from '@testing-library/react';

import OfferPage from './offer-page';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {getMockExtendedOffer, getMockStore} from '../../utils/mock-utils';

describe('Page: OfferPage', () => {
  const offer = getMockExtendedOffer();

  it('should render empty offer page', () => {
    const withHistoryComponent = withHistory(<OfferPage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      OFFER: {offer, isLoading: false,}
    }));

    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render empty offer page', () => {
    const withHistoryComponent = withHistory(<OfferPage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      OFFER: {offer, isLoading: false,}
    }));

    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
