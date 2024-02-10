import {Link, useLocation} from 'react-router-dom';
import './no-found-page.css';

const NoFoundPage = (): JSX.Element => {
  const {pathname} = useLocation();

  return (
    <section className='error'>
      <div className='error__wrapper'>
        <h1 className='error__title'>OPPS! <span className='error__subtitle'>{pathname}</span> Page no found</h1>
        <img className='error__image' src='img/404.jpg' alt='Error code 404.' width={591} height={420} />
        <Link className='error__button' to={'/'}>Back to home</Link>
      </div>
    </section>
  );
};

export default NoFoundPage;
