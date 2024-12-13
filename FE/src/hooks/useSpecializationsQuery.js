import { useQuery } from '@tanstack/react-query';
import { getAllSpecialization } from 'src/lib/specialization';
import { queryKeysConstants } from '../utils/queryKeysConstants';

export const useSpecializationsQuery = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: queryKeysConstants.allSpecializations,
    queryFn: async () => {
      return getAllSpecialization();
    },
  });
  return { isPending, isError, data, error };
};
