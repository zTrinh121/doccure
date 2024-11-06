import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useResetStep } from '../../../stores/authStore';

// const RequireOtpVerification = ({ allowedSteps }) => {
//   const resetStep = useResetStep();
//   console.log('resetStep', resetStep, allowedSteps);
//   return allowedSteps.includes(resetStep) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/forgotPassword" replace />
//   );
// };
function RequireOtpVerification({ children, allowedSteps }) {
  const resetStep = useResetStep();
  console.log('resetStep', resetStep, allowedSteps);
  return allowedSteps.includes(resetStep) ? (
    children
  ) : (
    <Navigate to="/forgotPassword" replace />
  );
}
export default RequireOtpVerification;
