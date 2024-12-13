//Splitting router into separate file
import { createBrowserRouter } from 'react-router-dom';

import HomePage from 'src/app/routes/app/HomePage';
import RequireOtpVerification from 'src/features/auth/components/RequireOtpVerification';
import HomeLayout from 'src/components/layouts/HomeLayout';
import PrivateRoutes from 'src/features/auth/components/PrivateRoutes';
import {
  doctorPrefix,
  homePrefix,
  paymentPrefix,
  userPrefix,
} from 'src/utils/routerConstants';

//https://stackoverflow.com/questions/76340518/lazy-loading-routes-in-react-router-v6
const router = createBrowserRouter([
  {
    path: homePrefix,
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <HomePage></HomePage>,
      },
      {
        path: '/login',
        async lazy() {
          let LoginPage = await import('src/app/routes/auth/LoginPage');
          return { Component: LoginPage.default };
        },
      },
      {
        path: '/register',
        async lazy() {
          let RegisterPage = await import('src/app/routes/auth/RegisterPage');
          return { Component: RegisterPage.default };
        },
      },
      {
        path: '/search',
        async lazy() {
          let SearchResultPage = await import(
            'src/app/routes/app/SearchResultPage'
          );
          return { Component: SearchResultPage.default };
        },
      },

      {
        path: '/googleCalendarAuthSuccessful',
        async lazy() {
          let GoogleCalendarAuthSuccessfulPage = await import(
            'src/app/routes/googleCalendarAuth/GoogleCalendarAuthSuccessfulPage'
          );
          return { Component: GoogleCalendarAuthSuccessfulPage.default };
        },
      },

      //forget password
      {
        path: '/forgotPassword',
        async lazy() {
          let ForgotPasswordPage = await import(
            'src/app/routes/auth/ForgotPasswordPage'
          );
          return { Component: ForgotPasswordPage.default };
        },
      },
      {
        path: '/otp',
        async lazy() {
          const { default: OtpPage } = await import(
            'src/app/routes/auth/OtpPage'
          );
          return {
            Component: (props) => (
              <RequireOtpVerification allowedSteps={['otp', 'password']}>
                <OtpPage {...props} />
              </RequireOtpVerification>
            ),
          };
        },
      },
      {
        path: '/resetPassword',
        async lazy() {
          const { default: ResetPasswordPage } = await import(
            'src/app/routes/auth/ResetPasswordPage'
          );
          return {
            Component: (props) => (
              <RequireOtpVerification allowedSteps={['password']}>
                <ResetPasswordPage {...props} />
              </RequireOtpVerification>
            ),
          };
        },
      },
      //end of forget pw

      //user
      {
        path: userPrefix,
        async lazy() {
          const { default: DashboardLayout } = await import(
            'src/components/layouts/DashboardLayout'
          );
          return {
            Component: () => (
              <PrivateRoutes>
                <DashboardLayout />
              </PrivateRoutes>
            ),
          };
        },
        children: [
          {
            path: 'profile',
            async lazy() {
              let ChangeProfilePage = await import(
                'src/app/routes/user/ChangeProfilePage'
              );
              return { Component: ChangeProfilePage.default };
            },
          },
          {
            path: 'changePassword',
            async lazy() {
              let ChangePasswordPage = await import(
                'src/app/routes/app/ChangePasswordPage'
              );
              return { Component: ChangePasswordPage.default };
            },
          },

          {
            path: 'appointment',
            async lazy() {
              let AppointmentsPage = await import(
                'src/app/routes/appointment/AppointmentsPage'
              );
              return { Component: AppointmentsPage.default };
            },
          },
          {
            path: 'appointment/:appointmentId',
            async lazy() {
              let AppointmentPage = await import(
                'src/app/routes/appointment/AppointmentPage'
              );
              return { Component: AppointmentPage.default };
            },
          },

          //invoice
          {
            path: 'invoice',
            async lazy() {
              let InvoicesPage = await import(
                'src/app/routes/invoice/InvoicesPage'
              );
              return { Component: InvoicesPage.default };
            },
          },
          {
            path: 'invoice/:invoiceId',
            async lazy() {
              let InvoicePage = await import(
                'src/app/routes/invoice/InvoicePage'
              );
              return { Component: InvoicePage.default };
            },
          },
        ],
      },
      //slot
      {
        path: '/slot',
        children: [
          {
            path: ':slotId',
            async lazy() {
              let SlotPage = await import('src/app/routes/slot/SlotPage');
              return { Component: SlotPage.default };
            },
          },
        ],
      },
      //payment

      {
        path: paymentPrefix,
        async lazy() {
          const { default: SimpleLayout } = await import(
            'src/components/layouts/SimpleLayout'
          );
          return {
            Component: () => (
              <PrivateRoutes>
                <SimpleLayout />
              </PrivateRoutes>
            ),
          };
        },
        children: [
          {
            path: 'success',
            async lazy() {
              let SuccessPage = await import('src/app/routes/pay/SuccessPage');
              return { Component: SuccessPage.default };
            },
          },
          {
            path: 'cancel',
            async lazy() {
              let CancelPage = await import('src/app/routes/pay/CancelPage');
              return { Component: CancelPage.default };
            },
          },
          {
            path: 'error',
            async lazy() {
              let ErrorPage = await import('src/app/routes/pay/ErrorPage');
              return { Component: ErrorPage.default };
            },
          },
        ],
      },
      //doctor
      {
        path: doctorPrefix,
        children: [
          {
            path: ':doctorId',
            async lazy() {
              let DoctorPage = await import('src/app/routes/doctor/DoctorPage');
              return { Component: DoctorPage.default };
            },
          },
          {
            path: ':doctorId/booking',
            async lazy() {
              const { default: DoctorBookingPage } = await import(
                'src/app/routes/doctor/DoctorBookingPage'
              );
              return {
                Component: () => (
                  <PrivateRoutes>
                    <DoctorBookingPage />
                  </PrivateRoutes>
                ),
              };
            },
          },
        ],
      },

      {
        path: '*',
        lazy: async () => {
          const { NotFoundRoute } = await import('src/app/routes/NotFound');
          return { Component: NotFoundRoute };
        },
      },
    ],
  },
]);
export default router;
