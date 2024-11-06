import { authAxiosInstance, publicAxiosInstance } from "./apiClient";

const paymentPrefix = "paypal/pay";

export const postPayment = async ({ slotId, specId }) => {
  return authAxiosInstance.post(`${paymentPrefix}?slot_id=${slotId}&specialization_id=${specId}`)
}

export const getPaymentSuccessful = async ({ appointmentId, invoiceId, slotId, userId, paymentId, payerId }) => {
  // http://localhost:8080/api/v1/paypal/pay/success?paymentId=PAYID-M4VQ6LQ3RY76553MM612371X&PayerID=WETAHRFG73THU&invoice_id=45&slot_id=125&user_id=5&appointment_id=105
  return publicAxiosInstance.get(`${paymentPrefix}/success?paymentId=${paymentId}&PayerID=${payerId}&invoice_id=${invoiceId}&slot_id=${slotId}&user_id=${userId}&appointment_id=${appointmentId}`)
}