import { useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUser';
import useLocalStorage from '../hooks/useLocalStorage';

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch('/user');
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      setCurrentUserState((prev) => ({ ...prev, isLoggedIn: false }));
      return;
    }

    doFetch();
    setCurrentUserState((prev) => ({ ...prev, isLoading: true }));
  }, [doFetch, setCurrentUserState, token]);

  useEffect(() => {
    if (!response) return;
    setCurrentUserState((prev) => ({
      ...prev,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }));
  }, [response, setCurrentUserState]);

  return children;
};

export default CurrentUserChecker;
