import { useQuery } from "@tanstack/react-query";
import { searchDoctors } from "../lib/doctor";

export const useSearchQuery = ({ input = '', spec = '' }) => {

  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ['search', input, spec],
    queryFn: async () => { return searchDoctors({ input, spec }) },
    placeholderData: (previousData, previousQuery) => previousData,
  });
  return { data, isSuccess, isPending, error }
}

