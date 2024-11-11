import { publicAxiosInstance } from "./apiClient";

export const searchDoctors = async ({ input, spec }) => {
  const checkDupe = (array, doctor) => {
    return array.find(item => item.doctor_id === doctor.doctor_id)
  }

  let resultArr = [];
  const arr = input.split(" ");
  if (input) {

    for (const element of arr) {
      try {
        const response = await publicAxiosInstance.get(`/doctor?keyword=${element}`);
        response.data.data.forEach(element => {
          if (!checkDupe(resultArr, element)) resultArr.push(element)
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
  else if (spec) {
    try {
      console.log('a')
      const response = await publicAxiosInstance.get(`/doctor/specialization?specialization=${spec}`);
      resultArr = response.data.data;
      console.log(resultArr)
    } catch (error) {
      console.log(error);
    }
  }
  return resultArr
}

export const getDoctor = async (id) => {
  return publicAxiosInstance.get(`/doctor/${id}`)
}

export const getDoctorSlots = async (startDate, endDate, doctorId) => {
  //yyyy-mm-dd
  return publicAxiosInstance.get(`doctor/slot/date?id=${doctorId}&start_date=${startDate}&end_date=${endDate}`)
}