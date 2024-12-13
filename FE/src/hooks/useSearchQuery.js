import { useQuery } from '@tanstack/react-query';
import { searchDoctors } from 'src/lib/doctor';

export const useSearchQuery = ({ input = '', spec = '' }) => {
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ['search', input, spec],
    queryFn: async () => {
      return searchDoctors({ input, spec });
    },
    placeholderData: (previousData) => previousData,
  });
  return { data, isSuccess, isPending, error };
};
