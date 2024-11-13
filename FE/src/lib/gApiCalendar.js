import { gApiAxiosInstance } from "./apiClient";


export const postInsertEvent = async (data) => {
  return gApiAxiosInstance.post('/primary/events', data);
};