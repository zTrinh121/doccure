import { Card, Modal, Input, Rate, Button, Spin } from 'antd';
const { TextArea } = Input;
import { Tooltip } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  GoogleOutlined,
  StarOutlined,
  TagOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { notification } from 'src/utils/antDesignGlobals';
import { useQueryClient } from '@tanstack/react-query';
import { getAppointment } from 'src/lib/appointment';
import { getCheckAuth, postAddEvent } from 'src/lib/googleCalendar';
import { useRatingMutation } from 'src/hooks/useRatingMutation';

import PropTypes from 'prop-types';

const AppointmentItem = ({ time, appointment, queryKey }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const mutation = useRatingMutation({
    openNotificationError,
    setIsModalOpen,
    queryKey,
  });

  const onOk = async () => {
    mutation.mutate({ comment, rate, appointment });
  };

  const onClickDetails = () => {
    navigate(`/user/appointment/${appointment.appointment_id}`);
  };

  const onClickInvoice = () => {
    navigate(`/user/invoice/${appointment.invoice.invoice_id}`);
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
      setIsLoading(true);
      const response = await getCheckAuth();
      if (response.data.authUrl) {
        window.open(response.data.authUrl, '_blank');
      } else if (response.data.message === 'Already authorized') {
        try {
          await postAddEvent({
            event_name: `Appointment+with+Dr. ${appointment.doctor.full_name}`,
            event_description: '',
            //+7hrs for timezone fuckery and bunch of slice and parse since someone cheaped out on actually usable date props;)
            start_date_time: new Date(
              new Date(Date.parse(time.slice(0, 16))).getTime() +
                7 * 60 * 60 * 1000,
            ).toISOString(),
            end_date_time: new Date(
              new Date(
                Date.parse(time.slice(0, 11) + time.slice(19)),
              ).getTime() +
                7 * 60 * 60 * 1000,
            ).toISOString(),
          });
          openNotificationSuccess(
            `Appointment with Dr. ${appointment.doctor.full_name}`,
          );
        } catch (error) {
          openNotificationError(error.message);
          console.log(error);
        }
      } else {
        openNotificationError('Not authorized');
      }
    } catch (error) {
      console.log(error);
      openNotificationError(error);
    } finally {
      setIsLoading(false);
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
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Appointment+with+Dr. ${
                  appointment.doctor.full_name
                }&dates=${new Date(Date.parse(time.slice(0, 16)))
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
              <Spin spinning={isLoading}>
                <Button
                  size="small"
                  shape="circle"
                  icon={<GoogleOutlined />}
                  target="_blank"
                  onClick={onClickGoogleCalendar}
                />
              </Spin>
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

AppointmentItem.propTypes = {
  time: PropTypes.string,
  appointment: PropTypes.object,
  queryKey: PropTypes.array,
};
