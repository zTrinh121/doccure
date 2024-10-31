import { axiosInstance } from "./apiClient";

export const searchDoctors = async (input) => {
  const checkDupe = (array, doctor) => {
    return array.find(item => item.doctor_id === doctor.doctor_id)
  }

  const resultArr = [];
  const arr = input.split(" ");

  for (const element of arr) {
    try {
      const response = await axiosInstance.get(`/doctor?keyword=${element}`);
      response.data.data.forEach(element => {
        if (!checkDupe(resultArr, element)) resultArr.push(element)
      })
    } catch (error) {
      console.log(error);
    }
  }
  return resultArr
}

export const getDoctor = async (id) => {
  return axiosInstance.get(`/doctor/${id}`)
}