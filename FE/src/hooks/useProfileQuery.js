import { useQuery } from '@tanstack/react-query';
import { useAccessToken } from '../stores/authStore';
import { fetchProfile } from '../lib/user';

export const useProfileQuery = () => {
  const accessToken = useAccessToken();
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return fetchProfile(accessToken);
    },
  });
  return { data, isSuccess, isPending, error };
};
