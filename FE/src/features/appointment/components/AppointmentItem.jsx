import { Card } from 'antd';
import React from 'react';
import AvatarWithDefault from '../../../components/ui/AvatarWithDefault';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Card>
      <div>
        <AvatarWithDefault avatar={avatar} size={30} />
        <div>Dr. {fullName}</div>
        <div>Status: {status}</div>
        <div>Price: {price}</div>
        <div>Time: {time}</div>
        <a onClick={onClickDetails}>Details</a>
        <a onClick={onClickInvoice}>Invoice</a>
      </div>
    </Card>
  );
};

export default AppointmentItem;
