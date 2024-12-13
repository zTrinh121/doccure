import { useQuery } from '@tanstack/react-query';
import { getRatingsOfDoctorById } from 'src/lib/rating';
import { queryKeysConstants } from '../utils/queryKeysConstants';

export const useDoctorRatings = (doctorId) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: queryKeysConstants.ratings(doctorId),
    queryFn: async () => {
      return getRatingsOfDoctorById(doctorId);
    },
  });
  return { isPending, isError, data, error };
};
