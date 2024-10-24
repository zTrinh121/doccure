import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { axiosInstance } from './apiClient';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const registerWithEmailAndPassword = async (data) => {
  return axiosInstance.post('/auth/register', data);
};

export const login = async (data) => {
  return axiosInstance.post('/auth/login', data);
};

export const getUsernameFromToken = (token) => {
  try {
    return jwtDecode(token).sub;
  } catch (e) {
    console.log(e);
  }
};

export const changePassword = async (token, data) => {
  data.username = getUsernameFromToken(token);
  console.log(data);
  return axiosInstance.put('/auth/change-password', data, {
    headers: {
      Authorization: `Bearer ${token}`, // Adding the Bearer token to the request
    },
  });
};

export const getNewAccessToken = () => {
  return axiosInstance.post('auth/refresh_token');
};

export const ProtectedRoute = ({ children }) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to={`/login`} replace />;
  }

  return children;
};
