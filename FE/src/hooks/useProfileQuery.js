import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../lib/auth";
import { queryConfig } from "../lib/reactQuery";
import { useAccessToken } from "../stores/authStore";


export const useProfileQuery = () => {


  const accessToken = useAccessToken();
  console.log(accessToken);
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => { return fetchProfile(accessToken) },

    // ...queryConfig
    //move to query config
    gcTime: 15 * 60 * 60,
    staleTime: 5 * 60 * 60,
    // enabled: Boolean(accessToken),
  });
  return { data, isSuccess, isPending, error }
}