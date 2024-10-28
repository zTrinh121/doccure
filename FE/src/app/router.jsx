//Splitting router into separate file
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// import ProductPage from "./pages/ProductPage.jsx";
import HomePage from './routes/app/HomePage';
import LoginPage from './routes/auth/LoginPage';
import RegisterPage from './routes/auth/RegisterPage';
import Profile from './routes/app/Profile';
import { ProtectedRoute, RequireOtpVerification } from '../lib/auth';
import HomeLayout from '../components/layouts/HomeLayout';
import ChangePasswordPage from './routes/app/ChangePasswordPage';
import ForgotPasswordPage from './routes/auth/ForgotPasswordPage';
import OtpPage from './routes/auth/OtpPage';
import ResetPasswordPage from './routes/auth/ResetPasswordPage';

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
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },

      //forget password
      {
        path: '/forgotPassword',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/otp',
        element: (
          // <RequireOtpVerification resetStepName='otp'>
          <OtpPage />
          // </RequireOtpVerification>
        ),
      },
      {
        path: '/resetPassword',
        element: (
          // <RequireOtpVerification resetStepName="password">
            <ResetPasswordPage />
          // </RequireOtpVerification>
        ),
      },
      //end of forget pw

      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/changePassword',
        element: (
          <ProtectedRoute>
            <ChangePasswordPage />
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
