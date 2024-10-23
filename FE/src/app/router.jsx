//Splitting router into separate file
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// import ProductPage from "./pages/ProductPage.jsx";
import HomePage from './routes/app/HomePage';
import LoginPage from './routes/auth/LoginPage';
import RegisterPage from './routes/auth/RegisterPage';
import Profile from './routes/app/Profile';
import { ProtectedRoute } from '../lib/auth';
import HomeLayout from '../components/layouts/HomeLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <HomePage></HomePage>,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFoundRoute } = await import('./routes/NotFound');
          return { Component: NotFoundRoute };
        },
      },
    ],
  },
]);
export default router;
