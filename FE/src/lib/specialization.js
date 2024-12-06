import { publicAxiosInstance } from './apiClient';
import { specializationPrefix } from '../utils/apiConstants';

// http://localhost:8080/api/v1/specialization/all
export const getAllSpecialization = async () => {
  return publicAxiosInstance.get(`${specializationPrefix}/all`);
};
