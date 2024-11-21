import { authAxiosInstance } from "./apiClient";

const googleCalendarPrefix = '/google-calendar';

export const getCheckAuth = async () => {
  return authAxiosInstance.get(`${googleCalendarPrefix}/check-auth`)
}

export const postAddEvent = async (data) => {
  return authAxiosInstance.post(`${googleCalendarPrefix}/create-event`, data)
}