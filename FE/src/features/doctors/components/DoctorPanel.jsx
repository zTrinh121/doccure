import { useDoctorQuery } from '../../../hooks/useDoctorQuery';
import { Card, Avatar, Badge, Typography, Rate, Button, Row, Col } from 'antd';
import {
  CheckCircleOutlined,
  EnvironmentOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MessageOutlined,
  HeartOutlined,
  ShareAltOutlined,
  LikeOutlined,
  HomeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const DoctorPanel = ({ responseData }) => {
  const navigate = useNavigate();
  const onClickBooking = () => {
    navigate(`/doctor/${responseData.doctor_id}/booking`);
  };
  // const { data, isSuccess, isPending, error } = useDoctorQuery(doctorId);
  return (
    <Card className="p-4 shadow-lg border rounded-lg max-w-4xl">
      <div className="flex">
        <div className="mr-6 flex flex-col items-center">
          <Avatar
            size={80}
            src={<img src={responseData.avatar} alt="avatar" />}
            className="mb-4"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center">
            <Typography.Title level={4} className="m-0 mr-2">
              {responseData.full_name}
            </Typography.Title>
            <CheckCircleOutlined className="text-green-500" />
          </div>
          <Typography.Text>
            Puts title here ( bằng cấp or sth idk)
          </Typography.Text>

          <div className="mt-2 flex items-center text-gray-500">
            <EnvironmentOutlined className="mr-1" />
            <Typography.Text>{responseData.hospital}</Typography.Text>
          </div>
          <div className="mt-2 flex items-center">
            <Rate allowHalf defaultValue={5} />
            <Typography.Text className="ml-2">5.0</Typography.Text>
            <Typography.Link className="ml-2">(150 Reviews)</Typography.Link>
          </div>
        </div>

        {/* Right Section with Additional Info */}
      </div>

      {/* Bottom Section with Stats and Action */}
      <div className="mt-4 border-t pt-4 flex justify-between">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <CalendarOutlined className="mr-2 text-blue-500" />
            <Typography.Text>number of appointments</Typography.Text>
          </div>
          <div className="flex items-center">
            <ClockCircleOutlined className="mr-2 text-blue-500" />
            <Typography.Text>
              In Practice for {responseData.experience} Years
            </Typography.Text>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Typography.Text>
            Price: ${responseData.min_price} - ${responseData.max_price} per
            Session
          </Typography.Text>
          <Button type="primary" onClick={onClickBooking}>
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DoctorPanel;
