import '../index.css';
import { RouterProvider } from 'react-router-dom';
import { Spin, App as AppAntd } from 'antd';
import { ConfigProvider } from 'antd';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import router from './router';
import {  useIsLoading } from '../stores/authStore';
import AntDesignGlobals from '../utils/antDesignGlobals';
import { useRefreshToken } from '../hooks/useRefreshToken';

function App() {
  const isLoading = useIsLoading();
  useRefreshToken();
 

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
