import { useQuery } from '@tanstack/react-query';
import { getAppointment } from 'src/lib/appointment';

export const useAppointmentQuery = (id) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['appointment', id],
    queryFn: async () => {
      return (await getAppointment(id)).data.data;
    },
  });
  return { isPending, isError, data, error };
};
