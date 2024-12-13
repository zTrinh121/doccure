import { publicAxiosInstance } from 'src/lib/apiClient';
import { slotPrefix } from 'src/utils/apiConstants';

export const getSlot = async (id) => {
  console.log('getSlot', id);
  return publicAxiosInstance.get(`${slotPrefix}/${id}`);
};
