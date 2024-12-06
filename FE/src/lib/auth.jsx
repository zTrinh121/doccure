import {
  authAxiosInstance,
  publicAxiosInstance,
} from './apiClient';
import { jwtDecode } from 'jwt-decode';
import { getActions } from '../stores/authStore';
import { authPrefix } from '../utils/apiConstants';

const { clearTokens } = getActions();

export const registerWithEmailAndPassword = async (data) => {
  return publicAxiosInstance.post(`${authPrefix}/register`, data);
};

export const login = async (data) => {
  return publicAxiosInstance.post(`${authPrefix}/login`, data);
};

export const logout = async (token) => {
  //todos:check invalid token
  await authAxiosInstance.get(`${authPrefix}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`, // Adding the Bearer token to the request
    },
  });
  clearTokens();
};

export const getUsernameFromToken = (token) => {
  try {
    return jwtDecode(token).sub;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (token, data) => {
  data.username = getUsernameFromToken(token);
  return authAxiosInstance.put(`${authPrefix}/change-password`, data);
};

// export const getNewAccessToken = async () => {
//   return axiosInstance.post('auth/refresh_token');
// };

export const sendResetEmail = async ({ email }) => {
  return publicAxiosInstance.post(`${authPrefix}/verify-mail/${email}`);
};

export const verifyOtp = async ({ otp, email }) => {
  return publicAxiosInstance.post(`${authPrefix}/verify-otp/${otp}/${email}`);
};

export const forgotPassword = async ({ values, email }) => {
  return publicAxiosInstance.post(
    `${authPrefix}/forgot-password/${email}`,
    values,
  );
};

//Can change to custom prop route to allow reuse
