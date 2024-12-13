import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/app';
import 'src/index.css';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { queryConfig } from 'src/utils/reactQuery';

const queryClient = new QueryClient({
  defaultOptions: {
    ...queryConfig,
  },
  queryCache: new QueryCache({
    // Turn on if you want every errors to be popper to notification
    // onError: (error) => {
    //   notification.error({
    //     message: 'Error',
    //     style: {
    //       width: 300,
    //     },
    //     description: error.message,
    //   });
    // },
  }),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
