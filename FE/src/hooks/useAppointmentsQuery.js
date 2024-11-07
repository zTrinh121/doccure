import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../lib/appointment";


// status, offset, limit
export const useAppointmentsQuery = ({ status, offset, limit }) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["appointments", status, offset, limit],
    queryFn: async () => {
      const response = await getAppointments({ status, offset, limit });
      response.data.total = parseInt(response.headers['x-total-count'])

      return response.data;
    },
  });
  return { isPending, isError, data, error }
}