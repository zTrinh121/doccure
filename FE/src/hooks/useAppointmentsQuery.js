import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../lib/appointment";


// status, offset, limit
export const useAppointmentsQuery = ({ status, offset, limit }) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["appointments", status, offset, limit],
    queryFn: async () => { return (await getAppointments({ status, offset, limit })).data.data },
  });
  return { isPending, isError, data, error }
}