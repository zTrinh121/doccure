import { useQuery } from "@tanstack/react-query";
import { getDoctor } from "../lib/doctor";


export const useDoctorQuery = (id) => {

  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => { return getDoctor(id) },

    // ...queryConfig
    //move to query config
    gcTime: 15 * 60 * 60,
    staleTime: 5 * 60 * 60,
    // enabled: Boolean(accessToken),
  });
  return { data, isSuccess, isPending, error }
}