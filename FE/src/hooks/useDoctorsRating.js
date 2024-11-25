import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../lib/appointment";
import { getFilterDoctorByRating } from "../lib/doctor";


// status, offset, limit
export const useDoctorsRating = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await getFilterDoctorByRating();
      return response.data.data;
    },
  });
  return { isPending, isError, data, error }
}