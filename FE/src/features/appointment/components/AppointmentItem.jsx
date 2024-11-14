import { Card, Divider, Modal, Input, Rate } from 'antd';
const { TextArea } = Input;
import AvatarWithDefault from '../../../components/ui/AvatarWithDefault';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postInsertRating } from '../../../lib/review';

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
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickDetails = () => {
    navigate(`/user/appointment/${appointmentId}`);
  };

  const onClickInvoice = () => {
    navigate(`/user/invoice/${invoiceId}`);
  };

  const onClickReview = () => {
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeRate = (rate) => {
    setRate(rate);
  };

  const onChangeText = (e) => {
    setComment(e.target.value);
  };

  const onOk = async () => {
    
    console.log(
      postInsertRating({
        comment,
        rating: rate,
        appointment_id: appointmentId,
      }),
    );
  };

  return (
    <>
      <Modal
        onCancel={onCancel}
        title="Add review"
        open={isModalOpen}
        onOk={onOk}
      >
        <Rate allowHalf onChange={onChangeRate} value={rate} />
        <p>Comment:</p>
        <TextArea rows={4} value={comment} onChange={onChangeText} />
      </Modal>

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

          <a onClick={onClickReview}>Add review</a>
        </div>
      </Card>
    </>
  );
};

export default AppointmentItem;
