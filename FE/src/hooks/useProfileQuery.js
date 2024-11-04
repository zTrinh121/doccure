import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../lib/auth";
import { queryConfig } from "../lib/reactQuery";
import { useAccessToken } from "../stores/authStore";


export const useProfileQuery = () => {


  const accessToken = useAccessToken();
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => { return fetchProfile(accessToken) },


  });
  return { data, isSuccess, isPending, error }
}