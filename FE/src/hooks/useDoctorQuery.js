import { useQuery } from '@tanstack/react-query';
import { getDoctor } from 'src/lib/doctor';

export const useDoctorQuery = (id, isSlotPending = false) => {
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ['doctor', id],
    queryFn: async () => {
      return getDoctor(id);
    },
    enabled: !isSlotPending,
    //!temp fix, remove later

    // enabled: Boolean(accessToken),
  });
  return { data, isSuccess, isPending, error };
};
