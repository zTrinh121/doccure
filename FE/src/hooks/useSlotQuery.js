import { useQuery } from '@tanstack/react-query';
import { getSlot } from '../lib/slot';

export const useSlotQuery = (id) => {
  //todo: Investigate how this is somehow disabled
  console.log('useSlotQuery');
  console.log(['slot', id]);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['slot', id],
    queryFn: async () => {
      return getSlot(id);
    },

    enabled: true,
  });
  console.log('useSlotQuery', data);
  return { isPending, isError, data, error };
};
