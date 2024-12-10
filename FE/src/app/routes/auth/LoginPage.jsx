import loginImage from '../../../assets/login.png';
import { Col, Row, Skeleton } from 'antd';
import { Image } from 'antd';
import { Flex } from 'antd';

import LoginCard from '../../../features/auth/components/LoginCard';

function LoginPage() {
  return (
    <>
      <div>
        <Flex justify="center" align="center">
          <Row className="grid grid-cols-12 gap-1">
            <Col className="col-span-1 md:col-span-2"></Col>
            <Col className="col-span-4 hidden md:block">
              <Image
                preview={false}
                src={loginImage}
                fallback={<Skeleton.Image />}
              />
            </Col>

            <Col className="col-span-10 md:col-span-4">
              <LoginCard></LoginCard>
            </Col>
            <Col className="col-span-1 md:col-span-2"></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
}

export default LoginPage;
