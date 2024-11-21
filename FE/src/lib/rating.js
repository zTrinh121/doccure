import { publicAxiosInstance } from "./apiClient";


const ratingPrefix = '/rating';


// http://localhost:8080/api/v1/doctor/rating/21
export const getRatingsOfDoctorById = async (doctorId) => {
  return publicAxiosInstance.get(`/doctor/rating/${doctorId}`);
}

export const postInsertRating = async (data) => {
  return authAxiosInstance.post(`${ratingPrefix}/insert`, data)
}