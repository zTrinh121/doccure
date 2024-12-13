import React from 'react';
import AppointmentItem from 'src/features/appointment/components/AppointmentItem';
import MemoizedButton from 'src/features/appointment/components/MemoizedButton';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

import { useAppointmentsInfiniteQuery } from 'src/hooks/useAppointmentsInfiniteQuery';
import { getTimeString } from 'src/utils/timeUtils';
import { useState, useCallback } from 'react';
import { useIntersectionCallback } from 'src/hooks/useIntersectionCallback';

const AppointmentFeed = () => {
  const [statusSelect, setStatusSelect] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useAppointmentsInfiniteQuery({ statusSelect, startDate, endDate });

  //intersection observer
  const containerRef = useIntersectionCallback({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  // const containerRef = useRef(null);
  // const intersectCallback = (entries) => {
  //   const [entry] = entries;
  //   if (hasNextPage && !isFetchingNextPage && entry.isIntersecting) {
  //     fetchNextPage();
  //   }
  // };
  // const options = {
  //   root: null,
  //   rootMargin: '0px',
  // };

  // useEffect(() => {
  //   const observer = new IntersectionObserver(intersectCallback, options);
  //   if (containerRef.current) observer.observe(containerRef.current);
  //   return () => {
  //     if (containerRef.current) observer.unobserve(containerRef.current);
  //   };
  // }, [status]);

  const onClick = useCallback(
    (value) => {
      const newStatus = statusSelect === value ? '' : value;
      setStatusSelect(newStatus);
    },
    [statusSelect],
  );

  const handleBookedClick = useCallback(() => onClick('booked'), [onClick]);
  const handlePendingClick = useCallback(
    () => onClick('pending_payment'),
    [onClick],
  );

  const onChange = (dates, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <div className="flex justify-between md:justify-normal flex-col md:flex-row">
        <div className="flex flex-start gap-2 p-2">
          <MemoizedButton
            isActive={statusSelect === 'booked'}
            label="Booked"
            onClick={handleBookedClick}
          />
          <MemoizedButton
            isActive={statusSelect === 'pending_payment'}
            label="Pending Payment"
            onClick={handlePendingClick}
          />
        </div>
        {statusSelect ? (
          <div>
            <RangePicker onChange={onChange} />
          </div>
        ) : (
          <></>
        )}
      </div>
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
