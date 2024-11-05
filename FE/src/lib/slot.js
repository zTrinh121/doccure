import { publicAxiosInstance } from "./apiClient"
const slotPrefix = '/slot'

export const getSlot = async (id) => {
  return publicAxiosInstance.get(`${slotPrefix}/${id}`)
}
