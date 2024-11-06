import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAccessToken } from '../../../stores/authStore';

const PrivateRoutes = ({ children }) => {
  const accessToken = useAccessToken();
  return accessToken ? <>{children}</> : <Navigate to="/login" />;
};
export default PrivateRoutes;
