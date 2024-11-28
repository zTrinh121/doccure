import React from 'react';
import { useAppointmentsInfiniteQuery } from './../../../hooks/useAppointmentsInfiniteQuery';
import AppointmentItem from './AppointmentItem';
import { getTimeString } from '../../../utils/timeUtils';

const AppointmentFeed = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useAppointmentsInfiniteQuery();
  console.log(data);

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <div className="flex flex-col gap-1 p-2">
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((appointment) => (
              <AppointmentItem
                key={appointment.appointment_id}
                time={getTimeString({
                  date: appointment.slot.date_slot,
                  start: appointment.slot.start_time,
                  end: appointment.slot.end_time,
                })}
                appointment={appointment}
                queryKey={['appointments']}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
};

export default AppointmentFeed;
