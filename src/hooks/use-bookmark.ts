import {useState} from 'react';
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

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(updateFavoriteOfferAction({
        id: id,
        status: isBookmark ? 1 : 0
      }));
      return setIsBookmark((prevState) => !prevState);
    }
    navigate(AppRoute.LOGIN);
  };

  return {isBookmark, handleBookmarkClick};
};
