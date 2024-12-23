import { useSuspenseQuery } from '@tanstack/react-query';
import { getInvoices } from 'src/lib/invoice';
import { queryKeysConstants } from '../utils/queryKeysConstants';

// status, offset, limit
export const useInvoicesQuery = ({ offset, limit }) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: queryKeysConstants.invoices({ offset, limit }),
    queryFn: async () => {
      const response = await getInvoices({ offset, limit });

      response.data.total = parseInt(response.headers['x-total-count']);

      return response;
    },
  });
  return { data, error, isFetching };
};
