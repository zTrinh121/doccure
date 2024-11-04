import axios from "axios";
import {
  getAccessToken,
  getActions
} from '../stores/authStore';
const { setAccessToken, clearTokens } = getActions();
const apiUrl = import.meta.env.VITE_API_URL;


export const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,

});

//injects Token for every request
axiosInstance.interceptors.request.use(request => {
  const accessToken = getAccessToken();
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
}, error => {
  return Promise.reject(error);
});

//duplicate of getNewAccessToken in auth.jsx
export const getNewAccessToken = async () => {
  try {
    const response = await axios.post(`${apiUrl}/auth/refresh_token`, {}, { withCredentials: true });
    setAccessToken(response.data.data.access_token);
    return response.data.data.access_token;
  } catch (error) {
    console.log(error);
    // return undefined;
  }
};

// refresh token handling
//todo : handle outdated token (refresh fail)
axiosInstance.interceptors.response.use(
  response => response, // Directly return successful responses.
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const response = await getNewAccessToken();
        const accessToken = response;
        setAccessToken(accessToken);

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        // clearTokens();
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    console.log(error)
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);