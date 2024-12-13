import { useQuery } from '@tanstack/react-query';
import { getInvoiceById } from 'src/lib/invoice';
import { queryKeysConstants } from '../utils/queryKeysConstants';

export const useInvoiceQuery = (id) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: queryKeysConstants.invoice(id),
    queryFn: async () => {
      return (await getInvoiceById(id)).data.data;
    },
  });
  return { isPending, isError, data, error };
};
