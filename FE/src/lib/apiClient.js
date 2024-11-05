import axios from "axios";
import {
  getAccessToken,
  getActions
} from '../stores/authStore';
const { setAccessToken, clearTokens } = getActions();
const apiUrl = import.meta.env.VITE_API_URL;

export const publicAxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,//redundant?
})

export const authAxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,

});

//injects Token for every request
//!apparently appending to every request, making server check for jwt everytime, either figure out how to conditionally include accessToken or tell back end about it >:)
//Fucks with login too:)
//todo:solution: have individual instances for requests demanding authentication and those that don't:)
authAxiosInstance.interceptors.request.use(request => {
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
//!bugs out if attempting to refresh for search, search requests with outdated tokens are resent and return nothing or something, attempt to recreate later
authAxiosInstance.interceptors.response.use(
  response => response, // Directly return successful responses.
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const response = await getNewAccessToken();
        const accessToken = response;
        setAccessToken(accessToken);

        authAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        console.log("retry", originalRequest._retry)
        return authAxiosInstance(originalRequest); // Retry the original request with the new access token.
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