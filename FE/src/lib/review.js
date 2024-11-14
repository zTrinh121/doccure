import { authAxiosInstance } from "./apiClient"

const reviewPrefix = '/rating'
export const postInsertRating = async (data) => {
  return authAxiosInstance.post(`${reviewPrefix}/insert`, data)
}