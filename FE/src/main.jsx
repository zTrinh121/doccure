import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { queryConfig } from './lib/reactQuery';
import { notification } from './utils/antDesignGlobals';

const queryClient = new QueryClient({
  defaultOptions: {
    ...queryConfig,
  },
  queryCache: new QueryCache({
    onError: (error) => {
      notification.error({
        message: 'Error',
        style: {
          width: 300,
        },
      });
    },
  }),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
