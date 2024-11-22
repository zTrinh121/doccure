import { Card, Divider, Modal, Input, Rate, Button } from 'antd';
const { TextArea } = Input;
import AvatarWithDefault from '../../../components/ui/AvatarWithDefault';
import { Tooltip } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  GoogleOutlined,
  StarOutlined,
  TagOutlined,
  TagsOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { notification } from '../../../utils/antDesignGlobals';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppointment } from '../../../lib/appointment';
import { getCheckAuth, postAddEvent } from '../../../lib/googleCalendar';
import { postInsertRating } from '../../../lib/rating';

const AppointmentItem = ({
  time,
  appointmentId,
  fullName,
  invoiceId,
  appointment,
  queryKey,
  isPending,
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

  const openNotificationSuccess = (description) => {
    notification.success({
      message: 'Appointment added successfully',
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

  const onMouseOverAppointment = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['appointment', appointment.appointment_id],
      queryFn: async () => {
        return (await getAppointment(appointment.appointment_id)).data.data;
      },
    });
  };

  const onClickGoogleCalendar = async () => {
    try {
      const response = await getCheckAuth();
      if (response.data.authUrl) {
        window.open(response.data.authUrl, '_blank');
      } else if (response.data.message === 'Already authorized') {
        postAddEvent({
          event_name: `Appointment+with+Dr. ${appointment.doctor.full_name}`,
          event_description: '',
          //+7hrs for timezone fuckery and bunch of slice and parse since someone cheaped out on actually usable date props;)
          start_date_time: new Date(
            new Date(Date.parse(time.slice(0, 16))).getTime() +
              7 * 60 * 60 * 1000,
          ).toISOString(),
          end_date_time: new Date(
            new Date(Date.parse(time.slice(0, 11) + time.slice(19))).getTime() +
              7 * 60 * 60 * 1000,
          ).toISOString(),
        });
        openNotificationSuccess(
          `Appointment with Dr. ${appointment.doctor.full_name}`,
        );
      } else {
        openNotificationError('Not authorized');
      }
    } catch (error) {
      console.log(error);
      openNotificationError(error);
    }
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

      <Card loading={isPending}>
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
                onMouseOver={onMouseOverAppointment}
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

            <Tooltip title="Add google event not manually (automatically) :)">
              <Button
                size="small"
                shape="circle"
                icon={<GoogleOutlined />}
                target="_blank"
                onClick={onClickGoogleCalendar}
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
