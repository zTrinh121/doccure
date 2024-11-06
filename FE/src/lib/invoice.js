import { authAxiosInstance } from "./apiClient"

const invoicePrefix = '/invoice';

export const getInvoiceById = async (invoiceId) => {
  return authAxiosInstance.get(`${invoicePrefix}/${invoiceId}`)
}