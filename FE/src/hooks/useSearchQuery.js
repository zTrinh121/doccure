import { useQuery } from "@tanstack/react-query";
import { searchDoctors } from "../lib/doctor";

export const useSearchQuery = (input) => {

  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ['search', input],
    queryFn: async () => { return searchDoctors(input) },

  });
  return { data, isSuccess, isPending, error }
}

