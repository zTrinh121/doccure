import { publicAxiosInstance } from 'src/lib/apiClient';
import { specializationPrefix } from 'src/utils/apiConstants';

// http://localhost:8080/api/v1/specialization/all
export const getAllSpecialization = async () => {
  return publicAxiosInstance.get(`${specializationPrefix}/all`);
};
