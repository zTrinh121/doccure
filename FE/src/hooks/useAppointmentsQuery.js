import { useQuery } from '@tanstack/react-query';
import { getAppointments } from 'src/lib/appointment';
import { queryKeysConstants } from '../utils/queryKeysConstants';

// status, offset, limit
export const useAppointmentsQuery = ({
  status,
  offset,
  limit,
  startDate = '',
  endDate = '',
}) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: queryKeysConstants.appointmentsPaginated({
      status,
      offset,
      limit,
      startDate,
      endDate,
    }),
    queryFn: async () => {
      const response = await getAppointments({
        status,
        offset,
        limit,
        startDate,
        endDate,
      });
      response.data.total = parseInt(response.headers['x-total-count']);

      return response.data;
    },
  });
  return { isPending, isError, data, error };
};
