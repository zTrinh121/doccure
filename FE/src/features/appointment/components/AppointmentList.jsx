import AppointmentItem from './AppointmentItem';
import {
  Button,
  Pagination,
  Spin,
  Typography,
  Divider,
  DatePicker,
} from 'antd';
const { RangePicker } = DatePicker;
const { Title } = Typography;

import { useAppointmentsQuery } from '../../../hooks/useAppointmentsQuery';
import { getTimeString } from '../../../utils/timeUtils';
import { useState } from 'react';
import { useEffect } from 'react';
import MemoizedButton from './MemoizedButton';
import { useCallback } from 'react';
import { memo } from 'react';
import { startTransition } from 'react';
import { Card } from 'antd';

const AppointmentList = () => {
  const [status, setStatus] = useState('');
  const [statusQuery, setStatusQuery] = useState(status);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });
  const { isPending, isError, data, error } = useAppointmentsQuery({
    status: statusQuery,
    offset: (pagination.page - 1) * pagination.pageSize,
    limit: pagination.pageSize,
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
  const responseData = data?.data;

  const onChangePagination = (page, pageSize) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page,
      pageSize,
    }));
  };

  const onClick = useCallback((value) => {
    setStatus((prevStatus) => {
      const newStatus = prevStatus === value ? '' : value;
      startTransition(() => {
        setStatusQuery(newStatus); // Use the resolved status value
      });
      return newStatus;
    });
  }, []);

  const handleBookedClick = useCallback(() => onClick('booked'), [onClick]);
  const handlePendingClick = useCallback(
    () => onClick('pending_payment'),
    [onClick],
  );

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
          {/* <Spin> */}
          <div>
            <RangePicker />
          </div>
          {/* </Spin> */}
        </div>
        <Spin spinning={isPending}>
          <div className="flex flex-col gap-1 p-2">
            {responseData
              ? responseData.map((appointment) => (
                  <AppointmentItem
                    key={appointment.appointment_id}
                    avatar={appointment.doctor.avatar}
                    status={appointment.status}
                    price={appointment.price}
                    fullName={appointment.doctor.full_name}
                    time={getTimeString({
                      date: appointment.slot.date_slot,
                      start: appointment.slot.start_time,
                      end: appointment.slot.end_time,
                    })}
                    appointmentId={appointment.appointment_id}
                    invoiceId={appointment.invoice.invoice_id}
                  />
                ))
              : Array.from({ length: pagination.pageSize }).map((_, index) => (
                  <Card size="small" loading key={index} />
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
