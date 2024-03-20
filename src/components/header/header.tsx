import {MouseEvent} from 'react';

import {Link} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {logoutAction} from '../../store/api-actions';
import {selectAuthorizationStatus, selectUser} from '../../store/user/user.selector';
import {selectFavoriteOffers} from '../../store/favoriteOffers/favoriteOffers.selector';

const Header = () => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const user = useAppSelector(selectUser);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
  const dispatch = useAppDispatch();

  const handleSignOutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={AppRoute.HOME}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.Auth ?
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.FAVORITES}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {user?.email}
                        </span>
                        <span className="header__favorite-count">
                          {favoriteOffers.length}
                        </span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="#"
                        onClick={handleSignOutClick}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </> :
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.LOGIN}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
