import { EnvironmentOutlined } from '@ant-design/icons';
import { Card, Rate } from 'antd';
const { Meta } = Card;

import { getStars } from 'src/utils/utils';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/doctor/${doctor.doctor_id}/booking`);
  };

  return (
    <Card
      onClick={onClick}
      hoverable
      className="w-[240px]"
      cover={<img alt="example" src={doctor.avatar} />}
    >
      <Meta
        title={doctor.full_name}
        // description="MS - Orthopaedics, MBBS, M.Ch - Orthopaedics"
      />
      <Rate
        allowHalf
        disabled
        defaultValue={getStars(doctor?.avg_rating)}
        className="text-[10px]"
      />
      ({doctor?.ratings?.length || 0})
      <p>
        <EnvironmentOutlined />
        {doctor.hospital}
      </p>
      {/* <p>
        <ClockCircleOutlined />
        Sometime
      </p> */}
      {/* <p>
        <DollarOutlined />
        Some amount
      </p> */}
    </Card>
  );
};

export default DoctorCard;

DoctorCard.propTypes = {
  doctor: PropTypes.object,
};
