import { authAxiosInstance } from "./apiClient"
const appointmentPrefix = '/appointment'

export const getAppointment = async (id) => {
  return authAxiosInstance.get(`${appointmentPrefix}/${id}`)
}

///http://localhost:8080/api/v1/appointment/all?offset=0&limit=4&status=booked
export const getAppointments = async ({ status, offset, limit }) => {
  return authAxiosInstance.get(`${appointmentPrefix}/all?offset=${offset}&limit=${limit}${status ? `&status=${status}` : ''}`)
}