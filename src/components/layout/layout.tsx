import {PropsWithChildren} from 'react';

import {Link} from 'react-router-dom';

import Header from '../header/header';
import {AppRoute} from '../../const';

type LayoutProps = PropsWithChildren<{
  containerClassName?: string;
  mainClassName?: string;
}>

const Layout = (
  {
    containerClassName = 'page page--gray page--main',
    mainClassName,
    children
  }: LayoutProps) => (
  <div className={containerClassName}>
    <Header />
    <main className={mainClassName}>
      {children}
    </main>
    {mainClassName?.includes('favorites') &&
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Home}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>}
  </div>
);

export default Layout;
