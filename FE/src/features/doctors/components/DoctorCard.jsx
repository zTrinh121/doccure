import {
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { Card, Rate } from 'antd';
const { Meta } = Card;

const DoctorCard = () => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src="https://doccure.dreamstechnologies.com/react/template/assets/img/doctors/doctor-06.jpg"
        />
      }
    >
      <Meta
        title="Katherine Berthold"
        description="MS - Orthopaedics, MBBS, M.Ch - Orthopaedics"
      />
      <Rate allowHalf disabled defaultValue={2.5} style={{ fontSize: 10 }} />
      (52)
      <p>
        <EnvironmentOutlined />
        SOmewhere
      </p>
      <p>
        <ClockCircleOutlined />
        Sometime
      </p>
      <p>
        <DollarOutlined />
        Some amount
      </p>
    </Card>
  );
};

export default DoctorCard;
