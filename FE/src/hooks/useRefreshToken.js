import { useEffect } from 'react';
import { getActions } from '../stores/authStore';
import { getNewAccessToken } from '../lib/apiClient';

export const useRefreshToken = () => {
  const { setIsLoading } = getActions();

  useEffect(() => {
    //todos:implement check for expire at value in return body of login request
    //todo: and make reloading less obnoxious
    const abortController = new AbortController();

    const fetchAccessToken = async () => {
      try {
        setIsLoading(true); // Start loading
        await getNewAccessToken(abortController);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // End loading only after the request completes
      }
    };

    fetchAccessToken();
    return () => {
      //     // abortController.abort(); //because fetching the first time invalidate current key, making subsequent requests invalid
    };
  }, [setIsLoading]);
};
