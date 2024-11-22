import { authAxiosInstance } from "./apiClient";

const googleCalendarPrefix = '/google-calendar';

export const getCheckAuth = async () => {
  return authAxiosInstance.get(`${googleCalendarPrefix}/check-auth`)
}

export const getCallback = async (code, scope) => {
  return authAxiosInstance.get(`${googleCalendarPrefix}/callback?code=${code}&scope=${scope}`)
}

export const postAddEvent = async (data) => {
  return authAxiosInstance.post(`${googleCalendarPrefix}/create-event`, data)
}
