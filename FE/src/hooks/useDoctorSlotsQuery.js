import { useQuery } from '@tanstack/react-query';
import { getDoctorSlots } from 'src/lib/doctor';
import { queryKeysConstants } from '../utils/queryKeysConstants';

export const useDoctorSlotsQuery = ({ startDate, endDate, doctorId }) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: queryKeysConstants.slots({ startDate, endDate, doctorId }),
    queryFn: async () => {
      return getDoctorSlots(startDate, endDate, doctorId);
    },
    retryOnMount: false,
  });
  return { isPending, isError, data, error };
};
