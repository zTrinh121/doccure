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
import DashboardLayout from '../components/layouts/DashboardLayout';
import ChangeProfilePage from './routes/app/user/ChangeProfilePage';
import SearchResultPage from './routes/app/SearchResultPage';
import DoctorPage from './routes/app/doctor/DoctorPage';
import DoctorBookingPage from './routes/app/doctor/DoctorBookingPage';
import SlotPage from './routes/app/slot/SlotPage';
import SuccessPage from './routes/app/pay/SuccessPage';
import CancelPage from './routes/app/pay/CancelPage';

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
      {
        path: '/search',
        element: <SearchResultPage />,
      },

      //forget password
      {
        path: '/forgotPassword',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/otp',
        element: (
          <RequireOtpVerification allowedSteps={['otp', 'password']}>
            <OtpPage />
          </RequireOtpVerification>
        ),
      },
      {
        path: '/resetPassword',
        element: (
          <RequireOtpVerification allowedSteps={['password']}>
            <ResetPasswordPage />
          </RequireOtpVerification>
        ),
      },
      //end of forget pw

      //user
      {
        path: '/user',
        element: <DashboardLayout />,
        children: [
          {
            path: 'profile',
            element: (
              <ProtectedRoute>
                <ChangeProfilePage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'changePassword',
            element: (
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      //slot
      {
        path: '/slot',
        // element: <DashboardLayout />,
        children: [
          {
            path: ':slotId',
            element: <SlotPage />,
          },
        ],
      },
      //payment

      {
        path: '/pay',
        // element: <DashboardLayout />,
        children: [
          {
            path: 'success',
            element: <SuccessPage />,
          },
          {
            path: 'cancel',
            element: <CancelPage />,
          },
        ],
      },
      //doctor
      {
        path: '/doctor',
        // element: <DashboardLayout />,
        children: [
          {
            path: ':doctorId',
            element: <DoctorPage />,
          },
          {
            //todo: flag as protected or handle unlogged in attempts
            path: ':doctorId/booking',
            element: <DoctorBookingPage />,
          },
        ],
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
