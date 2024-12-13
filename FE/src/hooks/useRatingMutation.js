import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postInsertRating } from 'src/lib/rating';

export const useRatingMutation = ({
  openNotificationError,
  setIsModalOpen,
  queryKey,
}) => {
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
    onError: (error) => {
      // An error happened!
      // console.log(`rolling back optimistic update with id ${context.id}`);
      openNotificationError(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onSettled: () => {
      setIsModalOpen(false);
    },
  });
};
