import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useResetStep } from '../../../stores/authStore';


function RequireOtpVerification({ children, allowedSteps }) {
  const resetStep = useResetStep();
  return allowedSteps.includes(resetStep) ? (
    children
  ) : (
    <Navigate to="/forgotPassword" replace />
  );
}
export default RequireOtpVerification;
