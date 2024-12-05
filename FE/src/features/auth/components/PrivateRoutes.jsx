import { Navigate } from 'react-router-dom';
import { useAccessToken } from '../../../stores/authStore';
import PropTypes from 'prop-types';

const PrivateRoutes = ({ children }) => {
  const accessToken = useAccessToken();
  return accessToken ? <>{children}</> : <Navigate to="/login" />;
};
export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.element,
};
