import { authAxiosInstance, getNewAccessToken } from 'src/lib/apiClient';
import { getAccessToken } from 'src/stores/authStore';
import { userPrefix } from 'src/utils/apiConstants';
import { getUsernameFromToken } from 'src/lib/auth';

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

export const fetchProfile = async () => {
  const username = getUsernameFromToken(getAccessToken());
  return authAxiosInstance.get(`${userPrefix}?username=${username}`);
};
