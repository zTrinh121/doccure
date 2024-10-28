import { Flex, Row, Col } from 'antd';
import ForgotPasswordEmailCard from '../../../features/auth/components/ForgotPasswordEmailCard';

const ForgotPasswordPage = () => {
  return (
    <>
      <div>
        <Flex justify="center" align="center">
          <Row style={{ width: '100%' }}>
            <Col span={6}></Col>
            <Col span={12}>
              <ForgotPasswordEmailCard />
            </Col>

            <Col span={6}></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
