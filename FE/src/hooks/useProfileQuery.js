import { useQuery } from '@tanstack/react-query';
import { useAccessToken } from 'src/stores/authStore';
import { fetchProfile } from 'src/lib/user';
import { queryKeysConstants } from '../utils/queryKeysConstants';

export const useProfileQuery = () => {
  const accessToken = useAccessToken();
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: queryKeysConstants.profile,
    queryFn: async () => {
      return fetchProfile(accessToken);
    },
  });
  return { data, isSuccess, isPending, error };
};
