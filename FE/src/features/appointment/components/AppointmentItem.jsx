import { Card, Divider, Modal, Input, Rate, Button } from 'antd';
const { TextArea } = Input;
import AvatarWithDefault from '../../../components/ui/AvatarWithDefault';
import { Tooltip } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  StarOutlined,
  TagOutlined,
  TagsOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postInsertRating } from '../../../lib/review';
import { notification } from '../../../utils/antDesignGlobals';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AppointmentItem = ({
  time,
  appointmentId,
  fullName,
  invoiceId,
  appointment,
  queryKey,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => {
      return postInsertRating({
        comment,
        rating: rate,
        appointment_id: appointmentId,
      });
    },
    // onMutate: (variables) => {

    // },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context.id}`);
      openNotificationError(error.message);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onSettled: () => {
      setIsModalOpen(false);
    },
  });

  const onOk = async () => {
    mutation.mutate();
  };

  const openNotificationError = (description) => {
    notification.error({
      message: 'Something went wrong',
      description: description,
      style: {
        width: 300,
      },
    });
  };

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
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex items-center">
            {/* <AvatarWithDefault avatar={avatar} size={30} /> */}
            <p>Dr. {appointment.doctor.full_name}</p>
          </div>
          <div className="flex items-center"> {appointment.status}</div>
          {/* <div>Price: {price}</div> */}
          <div className="flex items-center">
            <ClockCircleOutlined />{' '}
            <p className="mx-1">{`${time.slice(0, -7)}`}</p>
          </div>
          <div className="flex flex-row justify-around items-center">
            <Tooltip title="Details">
              <Button
                size="small"
                shape="circle"
                icon={<EyeOutlined />}
                onClick={onClickDetails}
              />
            </Tooltip>
            {/* <a onClick={onClickDetails}>Details </a> */}
            {/* <Divider type="vertical" /> */}

            <Tooltip title="Invoice">
              <Button
                size="small"
                shape="circle"
                icon={<TagOutlined />}
                onClick={onClickInvoice}
              />
            </Tooltip>

            <Tooltip title="Add google event manually :)">
              <Button
                size="small"
                shape="circle"
                icon={<CalendarOutlined />}
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
              />
            </Tooltip>

            <Tooltip title="Add review">
              <Button
                disabled={
                  appointment.rating_status === 'RATED' ||
                  appointment.status === 'PENDING_PAYMENT'
                    ? true
                    : false
                }
                size="small"
                shape="circle"
                icon={<StarOutlined />}
                onClick={onClickReview}
              />
            </Tooltip>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AppointmentItem;
