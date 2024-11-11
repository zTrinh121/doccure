import { useQuery } from "@tanstack/react-query";
import { getAllSpecialization } from './../lib/specialization';



export const useSpecializationsQuery = () => {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["specializations"],
    queryFn: async () => { return getAllSpecialization() },
  });
  return { isPending, isError, data, error }
}