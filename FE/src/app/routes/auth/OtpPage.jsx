import { Flex, Row, Col } from 'antd';
import OtpCard from 'src/features/auth/components/OtpCard';

const OtpPage = () => {
  return (
    <>
      <Flex justify="center" align="center">
        <Row className="w-full">
          <Col span={6}></Col>
          <Col span={12}>
            <OtpCard />
          </Col>

          <Col span={6}></Col>
        </Row>
      </Flex>
    </>
  );
};

export default OtpPage;
