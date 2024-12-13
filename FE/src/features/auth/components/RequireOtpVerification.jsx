import { Navigate } from 'react-router-dom';
import { useResetStep } from '../../../stores/authStore';
import PropTypes from 'prop-types';

function RequireOtpVerification({ children, allowedSteps }) {
  const resetStep = useResetStep();
  return allowedSteps.includes(resetStep) ? (
    children
  ) : (
    <Navigate to="/forgotPassword" replace />
  );
}
export default RequireOtpVerification;

RequireOtpVerification.propTypes = {
  children: PropTypes.element,
  allowedSteps: PropTypes.string,
};
