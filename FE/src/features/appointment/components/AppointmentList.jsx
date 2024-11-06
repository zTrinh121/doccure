import React from 'react';
import AppointmentItem from './AppointmentItem';
import { Pagination } from 'antd';
import { useAppointmentsQuery } from '../../../hooks/useAppointmentsQuery';
import IsPendingSpin from '../../../components/ui/IsPendingSpin';
import { getTimeString } from '../../../utils/timeUtils';

const AppointmentList = () => {
  const { isPending, isError, data, error } = useAppointmentsQuery({
    // status: 'booked',
    offset: 0,
    limit: 4,
  });

  if (isPending) {
    return <IsPendingSpin></IsPendingSpin>;
  }

  return (
    <div>
      <AppointmentItem />
      {JSON.stringify(data)}
      <div>
        {data.map((appointment) => {
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
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};

export default AppointmentList;
