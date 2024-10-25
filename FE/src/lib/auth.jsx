import { Navigate } from 'react-router-dom';
import { axiosInstance } from './apiClient';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getActions, useAccessToken } from '../stores/authStore';

const { setAccessToken, clearTokens } = getActions();

export const registerWithEmailAndPassword = async (data) => {
  return axiosInstance.post('/auth/register', data);
};

export const login = async (data) => {
  return axiosInstance.post('/auth/login', data);
};

export const logout = async () => {
  clearTokens();
};

export const getUsernameFromToken = (token) => {
  console.log(token);
  try {
    return jwtDecode(token).sub;
  } catch (e) {
    console.log(e);
  }
};

export const changePassword = async (token, data) => {
  //todos: extract to function for features that may try to refresh
  data.username = getUsernameFromToken(token);
  console.log(data);
  try {
    const response = await axiosInstance.put('/auth/change-password', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Adding the Bearer token to the request
      },
    });
    return response;
  } catch (error) {
    try {
     
      console.log(error);
      let newToken = await getNewAccessToken();
      return axiosInstance.put('/auth/change-password', data, {
        headers: {
          Authorization: `Bearer ${newToken}`, // Adding the Bearer token to the request
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance.post('auth/refresh_token');
    setAccessToken(response.data.data.access_token);
    console.log(response);
    return response.data.data.access_token;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const ProtectedRoute = ({ children }) => {
  const accessToken = useAccessToken();

  if (!accessToken) {
    return <Navigate to={`/login`} replace />;
  }

  return children;
};
