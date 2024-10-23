import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { axiosInstance } from './apiClient';
import { useLocation } from 'react-router-dom';

export const registerWithEmailAndPassword = async (data) => {
  return axiosInstance.post('/auth/register', data);
};

export const login = async (data) => {
  return axiosInstance.post('/auth/login', data);
};

export const ProtectedRoute = ({ children }) => {
  const accessToken = useAuthStore((state) => state.accessToken);


  if (!accessToken) {
    return <Navigate to={`/login`} replace />;
  }
  

  return children;
};
