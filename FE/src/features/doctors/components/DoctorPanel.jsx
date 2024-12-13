import { useDoctorQuery } from 'src/hooks/useDoctorQuery';
import { Card, Typography, Rate, Button, Col } from 'antd';
const { Link } = Typography;
import {
  CheckCircleOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import IsPendingSpin from 'src/components/ui/IsPendingSpin';
import AvatarWithDefault from 'src/components/ui/AvatarWithDefault';

import { useNavigate } from 'react-router-dom';
import { useDoctorRatings } from 'src/hooks/useDoctorRatings';
import { getStars } from 'src/utils/utils';
import { getActions } from 'src/stores/scrollStore';
import PropTypes from 'prop-types';
import { memo } from 'react';

const DoctorPanel = ({
  doctorId,
  showBottomSection = true,
  viewProfile = false,
}) => {
  const navigate = useNavigate();
  const { setScrollTarget } = getActions();
  const doctorQuery = useDoctorQuery(doctorId);
  const ratingQuery = useDoctorRatings(doctorId);
  if (doctorQuery.isPending || ratingQuery.isPending) {
    return <IsPendingSpin />;
  }

  const responseDataDoctor = doctorQuery.data.data.data;
  const responseDataRating = ratingQuery.data?.data.data;

  const onClickBooking = () => {
    navigate(`/doctor/${responseDataDoctor.doctor_id}/booking`);
  };

  const onClickProfile = () => {
    navigate(`/doctor/${responseDataDoctor.doctor_id}`);
  };

  const onClickReview = () => {
    setScrollTarget('review');
    navigate(`/doctor/${responseDataDoctor.doctor_id}`);
  };

  return (
    <Card className=" ">
      <div className="flex">
        <div className="mr-6 flex flex-col items-center">
          <AvatarWithDefault size={80} avatar={responseDataDoctor.avatar} />
        </div>

        <div className="flex-1">
          <div className="flex items-center">
            <Typography.Title level={4} className="m-0 mr-2">
              {responseDataDoctor.full_name}
            </Typography.Title>
            <CheckCircleOutlined className="text-green-500" />
          </div>

          <div className="mt-2 flex items-center text-gray-500">
            <EnvironmentOutlined className="mr-1" />
            <Typography.Text>{responseDataDoctor.hospital}</Typography.Text>
          </div>
          <div className="mt-2 flex md:items-center flex-col md:flex-row ">
            <Rate
              allowHalf
              disabled
              defaultValue={getStars(responseDataRating?.avg_rating)}
            />
            <div className="flex flex-row space-x-1">
              <Typography.Text className="ml-2">
                {responseDataRating?.avg_rating?.toFixed(2)}
              </Typography.Text>

              <Link underline onClick={onClickReview}>{`${
                responseDataRating?.count_ratings || '0'
              } review${
                responseDataRating?.count_ratings > 1 ? 's' : ''
              }`}</Link>
            </div>

            {/* <Typography.Link className="ml-2">(150 Reviews)</Typography.Link> */}
          </div>
        </div>
      </div>
      {showBottomSection && (
        <div className="mt-4 border-t pt-4 flex flex-col md:flex-row justify-between">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <ClockCircleOutlined className="mr-2 text-blue-500" />
              <Typography.Text>
                In Practice for {responseDataDoctor.experience} Years
              </Typography.Text>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-x-2">
            <Typography.Text>
              ${responseDataDoctor.min_price} - ${responseDataDoctor.max_price}{' '}
              per session
            </Typography.Text>
            <Col className="flex flex-row space-x-1 self-end">
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

export default memo(DoctorPanel);

DoctorPanel.propTypes = {
  doctorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showBottomSection: PropTypes.bool,
  viewProfile: PropTypes.bool,
};
