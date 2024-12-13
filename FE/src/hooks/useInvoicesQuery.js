import { useSuspenseQuery } from '@tanstack/react-query';
import { getInvoices } from 'src/lib/invoice';

// status, offset, limit
export const useInvoicesQuery = ({ offset, limit }) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['invoices', offset, limit],
    queryFn: async () => {
      const response = await getInvoices({ offset, limit });

      response.data.total = parseInt(response.headers['x-total-count']);

      return response;
    },
  });
  return { data, error, isFetching };
};
