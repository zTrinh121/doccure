import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../lib/auth";
import { queryConfig } from "../lib/reactQuery";
import { useAccessToken } from "../stores/authStore";


export const useProfileQuery = () => {

  const accessToken = useAccessToken();
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(accessToken),

    // ...queryConfig
    //move to query config
    gcTime: 15 * 60 * 60,
    staleTime: 5 * 60 * 60,
  });
  return { data, isSuccess, isPending, error }
}