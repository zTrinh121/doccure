import { useQuery } from "@tanstack/react-query";
import { getRatingsOfDoctorById } from "../lib/rating";


export const useDoctorRatings = (doctorId) => {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["ratings", doctorId],
    queryFn: async () => {
      console.log(getRatingsOfDoctorById(doctorId))
      return getRatingsOfDoctorById(doctorId)
    },
  });
  console.log(data)
  return { isPending, isError, data, error }
}