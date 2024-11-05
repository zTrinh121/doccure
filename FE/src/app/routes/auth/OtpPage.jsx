import { Flex, Row, Col } from 'antd';
import OtpCard from '../../../features/auth/components/OtpCard';
import Timer from '../../../components/ui/Timer';

const OtpPage = () => {
  return (
    <>
      <div>
        <Flex justify="center" align="center">
          <Row style={{ width: '100%' }}>
            <Col span={6}></Col>
            <Col span={12}>
              <OtpCard />
             
            </Col>

            <Col span={6}></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default OtpPage;
