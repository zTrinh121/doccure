import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeProfile } from '../lib/user';

export const useProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, values, token }) => {
      return changeProfile({ userId, values, token });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
  });
};
