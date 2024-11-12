import { publicAxiosInstance } from "./apiClient"
const specializationPrefix = '/specialization'

// http://localhost:8080/api/v1/specialization/all
export const getAllSpecialization = async () => {
  return publicAxiosInstance.get(`${specializationPrefix}/all`)
}
