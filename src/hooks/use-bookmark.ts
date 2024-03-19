import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from './use-store';
import {AppRoute, AuthorizationStatus} from '../const';
import {selectAuthorizationStatus} from '../store/user/user.selector';
import {updateFavoriteOfferAction} from '../store/api-actions';

export const useBookmark = (id = '', isFavorite = false) => {
  const [isBookmark, setIsBookmark] = useState(isFavorite);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    dispatch(updateFavoriteOfferAction({
      id: id,
      status: isBookmark ? 0 : 1
    }));
  }, [isBookmark]);

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setIsBookmark((prevState) => !prevState);
      return;
    }
    navigate(AppRoute.LOGIN);
  };

  return {isBookmark, handleBookmarkClick};
};
