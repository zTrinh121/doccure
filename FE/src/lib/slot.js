import { publicAxiosInstance } from './apiClient';
import { slotPrefix } from '../utils/apiConstants';

export const getSlot = async (id) => {
  console.log('getSlot', id);
  return publicAxiosInstance.get(`${slotPrefix}/${id}`);
};
