import { authAxiosInstance, getNewAccessToken } from './apiClient';
import { getUsernameFromToken } from './auth';
import { getAccessToken } from '../stores/authStore';
import { userPrefix } from '../utils/apiConstants';

export const changeAvatar = async ({ userId, file, token }) => {
  const formData = new FormData();
  formData.append('file', file);

  const putChangeAvatar = async (userId, file, token) => {
    return authAxiosInstance.put(`${userPrefix}/avatar/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  try {
    const response = await putChangeAvatar(userId, file, token);
    return response;
  } catch (error) {
    try {
      console.log(error);
      let newToken = await getNewAccessToken();
      const retryResponse = await putChangeAvatar(userId, file, newToken);
      return retryResponse;
    } catch (error) {
      console.log(error);
    }
  }
};

export const changeProfile = async ({ userId, values }) => {
  const response = await authAxiosInstance.put(
    `${userPrefix}/${userId}`,
    values,
  );
  return response;
};

export const fetchProfile = async (token) => {
  const username = getUsernameFromToken(getAccessToken());
  return authAxiosInstance.get(`${userPrefix}?username=${username}`);
};
