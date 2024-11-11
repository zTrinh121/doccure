import { authAxiosInstance } from "./apiClient"

const invoicePrefix = '/invoice';

export const getInvoiceById = async (invoiceId) => {
  return authAxiosInstance.get(`${invoicePrefix}/${invoiceId}`)
}


export const getInvoices = async ({offset,limit})=>{
  return authAxiosInstance.get(`${invoicePrefix}/all?offset=${offset}&limit=${limit}`)
}