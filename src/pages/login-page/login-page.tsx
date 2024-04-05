import {ChangeEvent, FormEvent, MouseEvent, useMemo, useState} from 'react';

import {Helmet} from 'react-helmet-async';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

import {getRandomElement} from '../../utils/app-utils';
import {validatePassword} from '../../utils/validate-utils';
import {AppRoute, cities, ErrorMessage} from '../../const';
import {useAppDispatch} from '../../hooks/use-store';
import {authAction} from '../../store/api-actions';
import {Locations} from '../../types/app-type';
import {changeLocation} from '../../store/offers/offers.slice';

const LoginPage = () => {
  const [formData, setFormData] = useState(
    {
      email: '',
      password: ''
    }
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useMemo(() => getRandomElement<Locations[number]>(cities), []);

  const handelFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData((prevState) => ({...prevState, [name]: value}));
  };

  const handelFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validatePassword(formData.password)) {
      toast.warn(ErrorMessage.PASSWORD_ERROR_MESSAGE);
      return;
    }

    dispatch(authAction(formData));
    setFormData((prevState) => ({...prevState, email: '', password: ''}));
  };

  const handleLocationClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeLocation(location.name));
    navigate(AppRoute.HOME);
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities | Sign in</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handelFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  data-testId="email-field"
                  onChange={handelFieldChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  data-testId="password-field"
                  onChange={handelFieldChange}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to="#"
                onClick={handleLocationClick}
              >
                <span>{location.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
