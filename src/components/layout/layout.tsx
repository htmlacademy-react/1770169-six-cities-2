import {Outlet, useLocation} from 'react-router-dom';
import {Path} from '../../const';
import {trimRoutPath} from '../../utils';
import Header from '../header/header';

type LayoutProps = {
  favorites: number;
}

const Layout = ({favorites}: LayoutProps): JSX.Element => {
  const {pathname} = useLocation();
  let containerClassName = '';
  let mainClassName = '';

  switch (trimRoutPath(pathname)) {
    case Path.FAVORITES:
      containerClassName = favorites ? '' : 'page--favorites-empty';
      mainClassName = favorites ? 'page__main--favorites' : 'page__main--favorites page__main--favorites-empty';
      break;
    case Path.LOGIN:
      containerClassName = 'page--gray page--login';
      mainClassName = 'page__main--login';
      break;
    case Path.OFFER:
      containerClassName = '';
      mainClassName = 'page__main--offer';
      break;
    default:
      containerClassName = 'page--gray page--main';
      mainClassName = 'page__main--index';
      break;
  }

  return (
    <div className={`"page" ${containerClassName}`}>
      <Header />
      <main className={`"page__main" ${mainClassName}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
