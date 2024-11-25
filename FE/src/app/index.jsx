import '../index.css';
import { RouterProvider } from 'react-router-dom';
import { Spin, App as AppAntd } from 'antd';
import { ConfigProvider } from 'antd';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import antDesignGlobals from '../utils/antDesignGlobals';

import router from './router';
import { getNewAccessToken } from '../lib/apiClient';
import { useEffect } from 'react';
import { getActions, useAccessToken, useIsLoading } from '../stores/authStore';
import AntDesignGlobals from '../utils/antDesignGlobals';

function App() {
  const queryClient = new QueryClient();
  const accessToken = useAccessToken();

  const isLoading = useIsLoading();
  const { setIsLoading } = getActions();

  useEffect(() => {
    //todos:implement check for expire at value in return body of login request
    //todo: and make reloading less obnoxios
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
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              siderBg: '#f5f5f5',
            },
          },
        }}
      >
        <AppAntd>
          <AntDesignGlobals />
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </AppAntd>
      </ConfigProvider>
    </>
  );
}

export default App;
