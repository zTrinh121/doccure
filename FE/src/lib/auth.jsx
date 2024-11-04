import { Navigate } from 'react-router-dom';
import {
  authAxiosInstance,
  getNewAccessToken,
  publicAxiosInstance,
} from './apiClient';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  getAccessToken,
  getActions,
  useAccessToken,
  useResetStep,
} from '../stores/authStore';

const { setAccessToken, clearTokens } = getActions();

export const registerWithEmailAndPassword = async (data) => {
  return publicAxiosInstance.post('/auth/register', data);
};

export const login = async (data) => {
  return publicAxiosInstance.post('/auth/login', data);
};

export const logout = async (token) => {
  //todos:check invalid token
  await authAxiosInstance.get('/auth/logout', {
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
  const putChangePassword = async (token, data) => {
    return authAxiosInstance.put('/auth/change-password', data, {
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
      return retryResponse;
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchProfile = async (token) => {
  //todos:try again with new token from refresh token

  const username = getUsernameFromToken(getAccessToken());
  const getProfile = async (token, username) => {
    return authAxiosInstance.get(`/users?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

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

// export const getNewAccessToken = async () => {
//   return axiosInstance.post('auth/refresh_token');
// };

export const sendResetEmail = async ({ email }) => {
  return publicAxiosInstance.post(`auth/verify-mail/${email}`);
};

export const verifyOtp = async ({ otp, email }) => {
  return publicAxiosInstance.post(`auth/verify-otp/${otp}/${email}`);
};

export const forgotPassword = async ({ values, email }) => {
  return publicAxiosInstance.post(`auth/forgot-password/${email}`, values);
};

export const ProtectedRoute = ({ children }) => {
  const accessToken = useAccessToken();

  if (!accessToken) {
    return <Navigate to={`/login`} replace />;
  }

  return children;
};

//Can change to custom prop route to allow reuse
export function RequireOtpVerification({ children, allowedSteps }) {
  const resetStep = useResetStep();
  console.log('resetStep', resetStep, allowedSteps);
  return allowedSteps.includes(resetStep) ? (
    children
  ) : (
    <Navigate to="/forgotPassword" replace />
  );
}
