import { Card, Divider } from 'antd';
import React from 'react';
import AvatarWithDefault from '../../../components/ui/AvatarWithDefault';
import { useNavigate } from 'react-router-dom';
import { postInsertEvent } from '../../../lib/gApiCalendar';

const AppointmentItem = ({
  avatar,
  time,
  appointmentId,
  status,
  price,
  fullName,
  invoiceId,
}) => {
  const navigate = useNavigate();

  const onClickDetails = () => {
    navigate(`/user/appointment/${appointmentId}`);
  };

  const onClickInvoice = () => {
    navigate(`/user/invoice/${invoiceId}`);
  };

  const onClickGoogleCalendar = async () => {
    const event = {
      summary: `Appointment with Dr. ${fullName}`,
      start: new Date(Date.parse(time.slice(0, 16))).toISOString(),
      end: new Date(
        Date.parse(time.slice(0, 11) + time.slice(19)),
      ).toISOString(),
    };
    console.log(postInsertEvent(event));
  };

  return (
    <Card>
      <div>
        <AvatarWithDefault avatar={avatar} size={30} />
        <div>Dr. {fullName}</div>
        <div>Status: {status}</div>
        <div>Price: {price}</div>
        <div>Time: {time}</div>
        <a onClick={onClickDetails}>Details </a>
        <Divider type="vertical" />

        <a onClick={onClickInvoice}>Invoice </a>
        <Divider type="vertical" />
        <a
          target="_blank"
          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Appointment+with+Dr. ${fullName}&dates=${new Date(
            Date.parse(time.slice(0, 16)),
          )
            .toISOString()
            .replace(/-/g, '')
            .replace(/:/g, '')
            .replace(/\.\d{3}/, '')}/${new Date(
            Date.parse(time.slice(0, 11) + time.slice(19)),
          )
            .toISOString()
            .replace(/-/g, '')
            .replace(/:/g, '')
            .replace(/\.\d{3}/, '')}`}
        >
          Add google event manually :){' '}
        </a>
        <Divider type="vertical" />

        <a onClick={onClickGoogleCalendar}>
          Add to Google Calendar (pog pog :O){' '}
        </a>
      </div>
    </Card>
  );
};

export default AppointmentItem;
