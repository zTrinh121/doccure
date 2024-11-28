import { useInfiniteQuery } from "@tanstack/react-query"
import { getAppointments } from "../lib/appointment";

export const useAppointmentsInfiniteQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['appointments'],
    queryFn: async ({ pageParam }) => {
      const response = await getAppointments({ status: '', offset: pageParam.offset, limit: pageParam.limit });
      response.data.total = parseInt(response.headers['x-total-count']);
      const nextOffset = pageParam.offset += pageParam.limit;
      response.data.nextPageParam =
        nextOffset >= response.data.total
          ? null
          : response.data.nextPageParam = {
            offset: nextOffset,
            limit: pageParam.limit
          }



      return response.data;
    },
    initialPageParam: { offset: 0, limit: 10 },
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
  })
  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  }
}

