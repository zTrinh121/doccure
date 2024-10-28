import { RouterProvider } from 'react-router-dom';
import router from './router';
import '../index.css';
import { useEffect } from 'react';
import { getNewAccessToken } from '../lib/auth';
import { getActions, useAccessToken, useIsLoading } from '../stores/authStore';
import { Spin } from 'antd';

function App() {
  const accessToken = useAccessToken();
  //temp
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }

  const isLoading = useIsLoading();
  const { setIsLoading } = getActions();

  useEffect(() => {
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
      // abortController.abort(); //because fetching the first time invalidate current key, making subsequent requests invalid
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
