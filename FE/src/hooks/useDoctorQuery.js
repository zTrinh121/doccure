import { useQuery } from "@tanstack/react-query";
import { getDoctor } from "../lib/doctor";


export const useDoctorQuery = (id) => {

  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => { return getDoctor(id) },


    // enabled: Boolean(accessToken),
  });
  return { data, isSuccess, isPending, error }
}