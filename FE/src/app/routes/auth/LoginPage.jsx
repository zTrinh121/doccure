import loginImage from '../../../assets/login.png';
import { Col, Row, Skeleton } from 'antd';
import { Image } from 'antd';
import { Flex } from 'antd';

import LoginCard from '../../../features/auth/components/LoginCard';

// import './App.css'

function LoginPage() {
  return (
    // <HomeLayout>
    <>
      {/* <RedirectIfLoggedIn> */}
        <div>
          <Flex justify="center" align="center">
            <Row>
              <Col span={4}></Col>
              <Col span={8}>
                <Image
                  preview={false}
                  src={loginImage}
                  fallback={<Skeleton.Image />}
                />
              </Col>

              <Col span={8}>
                <LoginCard></LoginCard>
              </Col>
              <Col span={4}></Col>
            </Row>
          </Flex>
        </div>
      {/* </RedirectIfLoggedIn> */}
    </>
  );
}

export default LoginPage;
