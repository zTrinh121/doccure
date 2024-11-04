import { authAxiosInstance } from "./apiClient";

export const postPayment = async ({ slotId, specId }) => {
  return authAxiosInstance.post(`paypal/pay?slot_id=${slotId}&specialization_id=${specId}`)
}