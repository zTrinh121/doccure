import { authAxiosInstance } from "./apiClient"
const appointmentPrefix = '/appointment'

export const getAppointment = async (id) => {
  return authAxiosInstance.get(`${appointmentPrefix}/${id}`)
}
