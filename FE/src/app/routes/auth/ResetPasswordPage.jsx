//confusing name, this is meant to be where you set the new password after completing otp authentication for forget password
import { Flex, Row, Col } from 'antd';
import ResetPasswordCard from 'src/features/auth/components/ResetPasswordCard';

const ResetPasswordPage = () => {
  return (
    <>
      <div>
        <Flex justify="center" align="center">
          <Row className="w-full">
            <Col span={6}></Col>
            <Col span={12}>
              <ResetPasswordCard />
            </Col>

            <Col span={6}></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default ResetPasswordPage;
