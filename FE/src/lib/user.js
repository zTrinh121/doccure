import { axiosInstance, getNewAccessToken } from "./apiClient";

export const changeAvatar = async ({ userId, file, token }) => {
  const formData = new FormData();
  formData.append('file', file);

  const putChangeAvatar = async (userId, file, token) => {
    return axiosInstance.put(`users/avatar/${userId}`, formData, {
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


export const changeProfile = async ({ userId, values, token }) => {
  const putChangeProfile = async (userId, values, token) => {

    return axiosInstance.put(`users/${userId}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    )
  }

  // try {
  const response = await putChangeProfile(userId, values, token);
  return response;
  // } catch (error) {
  //   try {
  //     console.log(error);
  //     let newToken = await getNewAccessToken();
  //     const retryResponse = await putChangeProfile(userId, values, newToken);
  //     return retryResponse
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
