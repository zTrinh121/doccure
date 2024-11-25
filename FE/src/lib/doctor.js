import { publicAxiosInstance } from "./apiClient";

const doctorPrefix = '/doctor'

export const searchDoctors = async ({ input, spec }) => {
  const checkDupe = (array, doctor) => {
    return array.find(item => item.doctor_id === doctor.doctor_id)
  }

  let resultArr = [];
  const arr = input.split(" ");
  if (input) {

    for (const element of arr) {
      try {
        const response = await publicAxiosInstance.get(`${doctorPrefix}?keyword=${element}`);
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
      const response = await publicAxiosInstance.get(`${doctorPrefix}/specialization?specialization=${spec}`);
      resultArr = response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  else {
    try {
      const response = await publicAxiosInstance.get(`${doctorPrefix}/all`);
      resultArr = response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  return resultArr
}

export const getDoctor = async (id) => {
  return publicAxiosInstance.get(`${doctorPrefix}/${id}`)
}

export const getFilterDoctorByRating = async () => {
  return publicAxiosInstance.get(`${doctorPrefix}/rating/filter?type=avgRating&order=highToLow`)
}
export const getDoctorSlots = async (startDate, endDate, doctorId) => {
  //yyyy-mm-dd
  return publicAxiosInstance.get(`${doctorPrefix}/slot/date?id=${doctorId}&start_date=${startDate}&end_date=${endDate}`)
}