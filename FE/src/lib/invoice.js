import { authAxiosInstance } from './apiClient';

import { invoicePrefix } from '../utils/apiConstants';

export const getInvoiceById = async (invoiceId) => {
  return authAxiosInstance.get(`${invoicePrefix}/${invoiceId}`);
};

export const getInvoices = async ({ offset, limit }) => {
  return authAxiosInstance.get(
    `${invoicePrefix}/all?offset=${offset}&limit=${limit}`,
  );
};

export const getDownloadInvoice = async (invoiceId) => {
  const response = await authAxiosInstance.get(
    `${invoicePrefix}/pdf/${invoiceId}`,
    { responseType: 'blob' },
  );
  return response;
};
