import {PropsWithChildren} from 'react';

import Header from '../header/header';

type LayoutProps = PropsWithChildren<{
  containerClassName?: string;
  mainClassName?: string;
}>

const Layout = (
  {
    containerClassName = 'page page--gray page--main',
    mainClassName = 'page__main page__main--index',
    children
  }: LayoutProps) => (
  <div className={containerClassName}>
    <Header />
    <main className={mainClassName}>
      {children}
    </main>
  </div>
);

export default Layout;
