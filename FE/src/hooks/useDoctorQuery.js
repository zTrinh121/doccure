import { useQuery } from "@tanstack/react-query";
import { getDoctor } from "../lib/doctor";


export const useDoctorQuery = (id, isSlotPending = false) => {

  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => { return getDoctor(id) },
    enabled: !isSlotPending,

    // enabled: Boolean(accessToken),
  });
  return { data, isSuccess, isPending, error }
}