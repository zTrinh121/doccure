import { publicAxiosInstance } from './apiClient';
const slotPrefix = '/slot';

export const getSlot = async (id) => {
  console.log('getSlot', id);
  return publicAxiosInstance.get(`${slotPrefix}/${id}`);
};
