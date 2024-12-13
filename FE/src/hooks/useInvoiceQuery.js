import { useQuery } from '@tanstack/react-query';
import { getInvoiceById } from 'src/lib/invoice';

export const useInvoiceQuery = (id) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      return (await getInvoiceById(id)).data.data;
    },
  });
  return { isPending, isError, data, error };
};
