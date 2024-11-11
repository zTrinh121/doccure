import { useSuspenseQuery } from "@tanstack/react-query";
import { getInvoices } from "../lib/invoice";

// status, offset, limit
export const useInvoicesQuery = ({ offset, limit }) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ["invoices", offset, limit],
    queryFn: async () => {
      return getInvoices({ offset, limit });
      // response.data.total = parseInt(response.headers['x-total-count'])

      // return response;
    },
  });
  return { data, error, isFetching }
}