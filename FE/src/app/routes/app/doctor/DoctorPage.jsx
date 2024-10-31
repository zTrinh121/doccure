import { useParams } from 'react-router-dom';
import { useDoctorQuery } from '../../../../hooks/useDoctorQuery';
import DoctorPanel from '../../../../features/doctors/components/DoctorPanel';
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

const DoctorPage = () => {
  const { doctorId } = useParams(); //for getting doctor id from url param
  const { data, isSuccess, isPending, error } = useDoctorQuery(doctorId);
  return (
    <div>
      DoctorPage{doctorId}
      {JSON.stringify(data)}
      <Row>
        <Col span={4}></Col>

        <Col span={16}>
          <DoctorPanel doctorId={doctorId} />
        </Col>
        <Col span={4}></Col>
      </Row>
      <Card className="p-4 shadow-lg border rounded-lg max-w-4xl">
        <div className="flex">
          {/* Left Section with Avatar */}
          <div className="mr-6 flex flex-col items-center">
            <Badge.Ribbon text="Available" color="green">
              <Avatar
                size={80}
                src="https://example.com/doctor-image.jpg"
                className="mb-4"
              />
            </Badge.Ribbon>
            <Button shape="circle" icon={<HeartOutlined />} className="mt-4" />

            <Button
              shape="circle"
              icon={<ShareAltOutlined />}
              className="mt-2"
            />
          </div>

          {/* Middle Section with Doctor Info */}
          <div className="flex-1">
            <div className="flex items-center">
              <Typography.Title level={4} className="m-0 mr-2">
                Dr. Martin Adian
              </Typography.Title>
              <CheckCircleOutlined className="text-green-500" />
              <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                Dentist
              </span>
            </div>
            <Typography.Text>
              BDS, MDS - Oral & Maxillofacial Surgery
            </Typography.Text>
            <Typography.Text className="block text-gray-500">
              Speaks: English, French, German
            </Typography.Text>
            <div className="mt-2 flex items-center text-gray-500">
              <EnvironmentOutlined className="mr-1" />
              <Typography.Text>
                No 14, 15th Cross, Old Trafford, UK
              </Typography.Text>
              <Typography.Link className="ml-1">
                (View Location)
              </Typography.Link>
            </div>
            <div className="mt-2 flex items-center">
              <Rate allowHalf defaultValue={5} />
              <Typography.Text className="ml-2">5.0</Typography.Text>
              <Typography.Link className="ml-2">(150 Reviews)</Typography.Link>
            </div>
          </div>

          {/* Right Section with Additional Info */}
          <div className="flex flex-col items-start justify-between">
            <Typography.Text className="flex items-center mb-2 text-gray-500">
              <VideoCameraOutlined className="mr-2" />
              Full Time, Online Therapy Available
            </Typography.Text>
            <Typography.Text className="flex items-center mb-2 text-gray-500">
              <LikeOutlined className="mr-2" />
              94% Recommended
            </Typography.Text>
            <Typography.Text className="flex items-center mb-2 text-gray-500">
              <HomeOutlined className="mr-2" />
              Royal Prince Alfred Hospital
            </Typography.Text>
            <div className="flex mt-4">
              <Button icon={<MessageOutlined />} className="mr-2">
                Chat
              </Button>
              <Button icon={<PhoneOutlined />} className="mr-2">
                Audio Call
              </Button>
              <Button icon={<VideoCameraOutlined />}>Video Call</Button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Stats and Action */}
        <div className="mt-4 border-t pt-4 flex justify-between">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <CalendarOutlined className="mr-2 text-blue-500" />
              <Typography.Text>Nearly 200+ Appointments Booked</Typography.Text>
            </div>
            <div className="flex items-center">
              <ClockCircleOutlined className="mr-2 text-blue-500" />
              <Typography.Text>In Practice for 21 Years</Typography.Text>
            </div>
            <div className="flex items-center">
              <TrophyOutlined className="mr-2 text-green-500" />
              <Typography.Text>15+ Awards</Typography.Text>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Typography.Text>Price: $100 - $200 per Session</Typography.Text>
            <Button type="primary">Book Appointment</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorPage;
