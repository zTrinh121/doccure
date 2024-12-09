import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postInsertRating } from '../lib/rating';

export const useRatingMutation = ({ openNotificationError,setIsModalOpen,queryKey }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ comment, rate, appointment }) => {
      return postInsertRating({
        comment,
        rating: rate,
        appointment_id: appointment.appointment_id,
      });
    },
    // onMutate: (variables) => {

    // },
    onError: (error, variables, context) => {
      // An error happened!
      // console.log(`rolling back optimistic update with id ${context.id}`);
      openNotificationError(error.message);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onSettled: () => {
      setIsModalOpen(false);
    },
  });
};
