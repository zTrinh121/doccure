import { useQuery } from '@tanstack/react-query';
import { getDoctorSlots } from 'src/lib/doctor';

export const useDoctorSlotsQuery = ({ startDate, endDate, doctorId }) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['slots', startDate, endDate, doctorId],
    queryFn: async () => {
      return getDoctorSlots(startDate, endDate, doctorId);
    },
    retryOnMount: false,
  });
  return { isPending, isError, data, error };
};
