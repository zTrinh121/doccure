import React from 'react';
import { useAppointmentsInfiniteQuery } from './../../../hooks/useAppointmentsInfiniteQuery';
import AppointmentItem from './AppointmentItem';
import { getTimeString } from '../../../utils/timeUtils';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

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

  //intersection observer
  const containerRef = useRef(null);
  const intersectCallback = (entries) => {
    const [entry] = entries;
    if (hasNextPage && !isFetchingNextPage && entry.isIntersecting) {
      fetchNextPage();
    }
  };
  const options = {
    root: null,
    rootMargin: '0px',
  };

  useEffect(() => {
    console.log('effect');
    console.log(containerRef.current);
    const observer = new IntersectionObserver(intersectCallback, options);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [status]);

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
      <div ref={containerRef}>
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
