import { authAxiosInstance, getNewAccessToken } from "./apiClient";

const userPrefix = '/users'

export const changeAvatar = async ({ userId, file, token }) => {
  const formData = new FormData();
  formData.append('file', file);

  const putChangeAvatar = async (userId, file, token) => {
    return authAxiosInstance.put(`users/avatar/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    )
  }

  try {
    const response = await putChangeAvatar(userId, file, token);
    return response;
  } catch (error) {
    try {
      console.log(error);
      let newToken = await getNewAccessToken();
      const retryResponse = await putChangeAvatar(userId, file, newToken);
      return retryResponse
    } catch (error) {
      console.log(error);
    }
  }
}


export const changeProfile = async ({ userId, values }) => {
  const response = await authAxiosInstance.put(`${userPrefix}/${userId}`, values);
  return response;
}
