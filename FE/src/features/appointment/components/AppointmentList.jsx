import React from 'react';
import AppointmentItem from './AppointmentItem';
import { Button, Pagination } from 'antd';
import { useAppointmentsQuery } from '../../../hooks/useAppointmentsQuery';
import IsPendingSpin from '../../../components/ui/IsPendingSpin';
import { getTimeString } from '../../../utils/timeUtils';
import { useState } from 'react';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useMemo } from 'react';

const AppointmentList = () => {
  const [status, setStatus] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });
  const { isPending, isError, data, error } = useAppointmentsQuery({
    status: status,
    offset: pagination.page - 1,
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

  const onClick = (value) => {
    status === value ? setStatus('') : setStatus(value);
  };

  return (
    <div>
      <Spin spinning={isPending}>
        <div>
          <Button
            type={status === 'booked' ? 'primary' : ''}
            onClick={() => {
              onClick('booked');
            }}
          >
            Booked
          </Button>
          <Button
            type={status === 'pending_payment' ? 'primary' : ''}
            onClick={() => {
              onClick('pending_payment');
            }}
          >
            Pending Payment
          </Button>
          {responseData?.map((appointment) => {
            return (
              <>
                {' '}
                <AppointmentItem
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
              </>
            );
          })}
        </div>
      </Spin>
      <Pagination
        defaultCurrent={1}
        total={pagination.total}
        showSizeChanger
        showTotal={(total) => `Total ${total} items`}
        onChange={onChangePagination}
      />
    </div>
  );
};

export default AppointmentList;
