import { useQuery } from "@tanstack/react-query";
import { searchDoctors } from "../lib/doctor";

export const useSearchQuery = (input) => {

  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ['search', input],
    queryFn: async () => { return searchDoctors(input) },

    // ...queryConfig
    //move to query config
    gcTime: 15 * 60 * 60,
    staleTime: 5 * 60 * 60,
    // enabled: Boolean(accessToken),
  });
  return { data, isSuccess, isPending, error }
}

