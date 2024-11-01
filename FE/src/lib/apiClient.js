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

//refresh token handling
//NEED testing, causes infinite loop
// axiosInstance.interceptors.response.use(
//   response => response, // Directly return successful responses.
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
//       try {
//         // const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
//         // Make a request to your auth server to refresh the token.
//         const response = await axios.post(`${apiUrl}/auth/refresh_token`);
//         const accessToken = response.data.data.access_token;
//         setAccessToken(accessToken);


//         // Update the authorization header with the new access token.
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest); // Retry the original request with the new access token.
//       } catch (refreshError) {
//         // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
//         console.error('Token refresh failed:', refreshError);
//         // clearTokens();
//         // window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error); // For all other errors, return the error as is.
//   }
// );