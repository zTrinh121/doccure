import React from 'react';
import AppointmentItem from './AppointmentItem';
import { Button, Pagination } from 'antd';
import { useAppointmentsQuery } from '../../../hooks/useAppointmentsQuery';
import IsPendingSpin from '../../../components/ui/IsPendingSpin';
import { getTimeString } from '../../../utils/timeUtils';
import { useState } from 'react';
import { Spin } from 'antd';

const AppointmentList = () => {
  const [status, setStatus] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const { isPending, isError, data, error } = useAppointmentsQuery({
    status: status,
    offset: pagination.page,
    limit: pagination.pageSize,
  });

  // if (isPending) {
  //   return <IsPendingSpin></IsPendingSpin>;
  // }

  const onChangePagination = (page, pageSize) => {
    console.log('page', page, 'pagesize', pageSize);
    setPagination({ page, pageSize });
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
          {data?.map((appointment) => {
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
        total={50}
        showSizeChanger
        showTotal={(total) => `Total ${total} items`}
        onChange={onChangePagination}
      />
    </div>
  );
};

export default AppointmentList;
