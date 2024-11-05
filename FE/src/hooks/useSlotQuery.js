import { useQuery } from "@tanstack/react-query";
import { getSlot } from "../lib/slot";



export const useSlotQuery = (id) => {

  const  { isPending, isError, data, error } = useQuery({
    queryKey: ["slot", id],
    queryFn: async () => { return getSlot(id) },


    // enabled: Boolean(accessToken),
  });
  return  { isPending, isError, data, error }
}