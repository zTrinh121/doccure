import { useQuery } from "@tanstack/react-query";
import { getDoctorSlots } from "../lib/doctor";

export const useDoctorSlotsQuery = ({startDate,endDate,doctorId}) => {

  const { isPending, isError, data, error }  = useQuery({
    queryKey: ["slots", startDate,endDate,doctorId],
    queryFn: async () => { return getDoctorSlots(startDate,endDate,doctorId) },

  
  });
  return { isPending, isError, data, error } 
}