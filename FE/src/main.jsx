import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryConfig } from './lib/reactQuery';

const queryClient = new QueryClient({
  defaultOptions: {
    ...queryConfig,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    ,
  </StrictMode>,
);
