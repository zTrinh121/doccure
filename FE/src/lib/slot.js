import { axiosInstance } from "./apiClient"
const slotPrefix = '/slot'

export const getSlot = async (id) => {
  return axiosInstance.get(`${slotPrefix}/${id}`)
}
