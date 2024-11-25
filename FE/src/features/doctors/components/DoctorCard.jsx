import {
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { Card, Rate } from 'antd';
const { Meta } = Card;

import { getStars } from '../../../utils/utils';

const DoctorCard = ({ doctor }) => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
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
        style={{ fontSize: 10 }}
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
