import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const useFetch = (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAutoDestroy = false;

    if (!isLoading) {
      return;
    }

    const requestOptions = {
      ...options,
      ...{
        headers: { authorization: token ? `Bearer ${token}` : '' },
      },
    };

    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAutoDestroy) {
          setResponse(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!skipGetResponseAutoDestroy) {
          setError(err.response.data);
          setIsLoading(false);
        }
      });
    return () => {
      skipGetResponseAutoDestroy = true;
    };
  }, [isLoading, options, token, url]);

  return [{ isLoading, response, error }, doFetch];
};

export default useFetch;
