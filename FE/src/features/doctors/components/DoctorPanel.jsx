import { useDoctorQuery } from '../../../hooks/useDoctorQuery';
import { Card, Avatar, Badge, Typography, Rate, Button, Row, Col } from 'antd';
import {
  CheckCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import IsPendingSpin from '../../../components/ui/IsPendingSpin';
import AvatarWithDefault from '../../../components/ui/AvatarWithDefault';
import { useDoctorRatings } from '../../../hooks/useDoctorRatings';
import { getStars } from '../../../utils/utils';

const DoctorPanel = ({
  doctorId,
  showBottomSection = true,
  viewProfile = false,
}) => {
  const navigate = useNavigate();

  const { data, isSuccess, isPending, error } = useDoctorQuery(doctorId);
  const {
    isPending: isPendingR,
    isError: isErrorR,
    data: dataR,
    error: errorR,
  } = useDoctorRatings(doctorId);
  if (isPending || isPendingR) {
    return <IsPendingSpin />;
  }

  const responseData = data.data.data;
  const responseDataR = dataR?.data.data;
  console.log(dataR);

  const onClickBooking = () => {
    navigate(`/doctor/${responseData.doctor_id}/booking`);
  };

  const onClickProfile = () => {
    navigate(`/doctor/${responseData.doctor_id}`);
  };

  return (
    <Card className="p-4 my-1 shadow-lg border rounded-lg">
      <div className="flex">
        <div className="mr-6 flex flex-col items-center">
          <AvatarWithDefault size={80} avatar={responseData.avatar} />
        </div>

        <div className="flex-1">
          <div className="flex items-center">
            <Typography.Title level={4} className="m-0 mr-2">
              {responseData.full_name}
            </Typography.Title>
            <CheckCircleOutlined className="text-green-500" />
          </div>
          {/* <Typography.Text>
            Puts title here ( bằng cấp or sth idk)
          </Typography.Text> */}

          <div className="mt-2 flex items-center text-gray-500">
            <EnvironmentOutlined className="mr-1" />
            <Typography.Text>{responseData.hospital}</Typography.Text>
          </div>
          <div className="mt-2 flex items-center">
            <Rate
              allowHalf
              disabled
              defaultValue={getStars(responseDataR?.avg_rating)}
            />
            <Typography.Text className="ml-2">
              {responseDataR?.avg_rating}
            </Typography.Text>
            {/* <Typography.Link className="ml-2">(150 Reviews)</Typography.Link> */}
          </div>
        </div>
      </div>
      {showBottomSection && (
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
            <Col>
              {viewProfile && (
                <Button className="px-1" onClick={onClickProfile}>
                  View profile
                </Button>
              )}

              <Button className="px-1" type="primary" onClick={onClickBooking}>
                Book Appointment
              </Button>
            </Col>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DoctorPanel;
