//Splitting router into separate file
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// import ProductPage from "./pages/ProductPage.jsx";
import HomePage from './routes/app/HomePage';
import LoginPage from './routes/auth/LoginPage';
import RegisterPage from './routes/auth/RegisterPage';
import Profile from './routes/app/Profile';
import RequireOtpVerification from '../features/auth/components/RequireOtpVerification';
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
import AppointmentPage from './routes/app/appointment/AppointmentPage';
import PrivateRoutes from '../features/auth/components/PrivateRoutes';
import AppointmentsPage from './routes/app/appointment/AppointmentsPage';
import SimpleLayout from '../components/layouts/SimpleLayout';
import ErrorPage from './routes/app/pay/ErrorPage';
import InvoicePage from './routes/app/invoice/InvoicePage';

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
        element: (
          <PrivateRoutes>
            <DashboardLayout />
          </PrivateRoutes>
        ),
        children: [
          {
            path: 'profile',
            element: (
              // <ProtectedRoute>
              <ChangeProfilePage />
              // </ProtectedRoute>
            ),
          },
          {
            path: 'changePassword',
            element: <ChangePasswordPage />,
          },
          {
            path: 'appointment',

            element: <AppointmentsPage />,
          },
          {
            path: 'appointment/:appointmentId',

            element: <AppointmentPage />,
          },
          {
            path: 'invoice',

            // element: <AppointmentsPage />,
          },
          {
            path: 'invoice/:invoiceId',

            element: <InvoicePage />,
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
        element: (
          <PrivateRoutes>
            <SimpleLayout />
          </PrivateRoutes>
        ),
        children: [
          {
            path: 'success',
            element: <SuccessPage />,
          },
          {
            path: 'cancel',
            element: <CancelPage />,
          },
          {
            path: 'error',
            element: <ErrorPage />,
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
            element: (
              <PrivateRoutes>
                <DoctorBookingPage />
              </PrivateRoutes>
            ),
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
