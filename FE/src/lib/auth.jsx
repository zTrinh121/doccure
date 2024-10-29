import { Navigate } from 'react-router-dom';
import { axiosInstance } from './apiClient';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getActions, useAccessToken, useResetStep } from '../stores/authStore';

const { setAccessToken, clearTokens } = getActions();

export const registerWithEmailAndPassword = async (data) => {
  return axiosInstance.post('/auth/register', data);
};

export const login = async (data) => {
  return axiosInstance.post('/auth/login', data);
};

export const logout = async (token) => {
  clearTokens();
  axiosInstance.get('/auth/logout', {
    headers: {
      Authorization: `Bearer ${token}`, // Adding the Bearer token to the request
    },
  });
};

export const getUsernameFromToken = (token) => {
  try {
    return jwtDecode(token).sub;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (token, data) => {
  const putChangePassword = async (token, data) => {
    return axiosInstance.put('/auth/change-password', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Adding the Bearer token to the request
      },
    });
  };
  data.username = getUsernameFromToken(token);
  try {
    const response = await putChangePassword(token, data);
    return response;
  } catch (error) {
    try {
      console.log(error);
      let newToken = await getNewAccessToken();
      const retryResponse = await putChangePassword(newToken, data);
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchProfile = async (token) => {
  //todos:try again with new token from refresh token
  const getProfile = async (token, username) => {
    return axiosInstance.get(`/users?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const username = getUsernameFromToken(token);

  try {
    const response = await getProfile(token, username);
    return response;
  } catch (error) {
    try {
      console.log(error);
      let newToken = await getNewAccessToken();
      const retryResponse = await getProfile(newToken, username);
      return retryResponse;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance.post('auth/refresh_token');
    setAccessToken(response.data.data.access_token);
    return response.data.data.access_token;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const sendResetEmail = async ({ email }) => {
  return axiosInstance.post(`auth/verify-mail/${email}`);
};

export const verifyOtp = async ({ otp, email }) => {
  return axiosInstance.post(`auth/verify-otp/${otp}/${email}`);
};

export const forgotPassword = async ({ values, email }) => {
  return axiosInstance.post(`auth/forgot-password/${email}`, values);
};

export const ProtectedRoute = ({ children }) => {
  const accessToken = useAccessToken();

  if (!accessToken) {
    return <Navigate to={`/login`} replace />;
  }

  return children;
};

export function RequireOtpVerification({ children, resetStepName }) {
  const resetStep = useResetStep();
  return resetStep === resetStepName ? (
    children
  ) : (
    <Navigate to="/forgotPassword" replace />
  );
}
