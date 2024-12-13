import AppointmentItem from 'src/features/appointment/components/AppointmentItem';
import { Pagination, Spin, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import MemoizedButton from 'src/features/appointment/components/MemoizedButton';

import { useAppointmentsQuery } from 'src/hooks/useAppointmentsQuery';
import { getTimeString } from 'src/utils/timeUtils';
import { useState, useEffect, startTransition, useCallback, memo } from 'react';

const AppointmentList = () => {
  const [status, setStatus] = useState('');
  const [statusQuery, setStatusQuery] = useState(status);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });
  const { isPending, data } = useAppointmentsQuery({
    status: statusQuery,
    offset: (pagination.page - 1) * pagination.pageSize,
    limit: pagination.pageSize,
    startDate,
    endDate,
  });
  // const total = useMemo(() => data?.total, [data?.total]);

  useEffect(() => {
    if (data?.total) {
      //!no watching for empty data
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: data?.total,
      }));
    }
  }, [data?.total]);

  const responseData = data?.data || [];

  const onChangePagination = (page, pageSize) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page,
      pageSize,
    }));
  };

  const onClick = useCallback(
    (value) => {
      const newStatus = status === value ? '' : value;
      setStatus(newStatus);
      startTransition(() => {
        setStatusQuery(newStatus); // Use the resolved status value
      });
    },
    [status],
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

  return (
    <div>
      <div>
        <div className="flex justify-between md: justify-normal flex-col md:flex-row">
          <div className="flex flex-start gap-2 p-2">
            <MemoizedButton
              isActive={status === 'booked'}
              label="Booked"
              onClick={handleBookedClick}
            />
            <MemoizedButton
              isActive={status === 'pending_payment'}
              label="Pending Payment"
              // onClick={handleBookedClick}

              onClick={handlePendingClick}
            />
          </div>
          {status ? (
            <div>
              <RangePicker onChange={onChange} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Spin spinning={isPending}>
          <div className="flex flex-col gap-1 p-2">
            {responseData.map((appointment) => (
              <AppointmentItem
                key={appointment.appointment_id}
                time={getTimeString({
                  date: appointment.slot.date_slot,
                  start: appointment.slot.start_time,
                  end: appointment.slot.end_time,
                })}
                appointment={appointment}
                queryKey={[
                  'appointments',
                  status,
                  (pagination.page - 1) * pagination.pageSize,
                  pagination.pageSize,
                  startDate,
                  endDate,
                ]}
              />
            ))}
          </div>
        </Spin>
      </div>
      <div className="flex justify-center">
        <Pagination
          defaultCurrent={1}
          total={pagination.total}
          showSizeChanger
          showTotal={(total) => `Total ${total} items`}
          onChange={onChangePagination}
        />
      </div>
    </div>
  );
};

export default memo(AppointmentList);
