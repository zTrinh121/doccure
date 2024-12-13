import { useQuery } from '@tanstack/react-query';
import { getFilterDoctorByRating } from 'src/lib/doctor';

// status, offset, limit
export const useDoctorsRating = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const response = await getFilterDoctorByRating();
      return response.data.data;
    },
  });
  return { isPending, isError, data, error };
};
