import loginImage from '../../../assets/login.png';
import { Col, Row, Skeleton } from 'antd';
import { Image } from 'antd';
import { Flex } from 'antd';

import LoginCard from '../../../features/auth/components/LoginCard';
import HomeLayout from '../../../components/layouts/HomeLayout';

// import './App.css'

function LoginPage() {
  return (
    <HomeLayout>
      <>
        <div>
          <Flex justify="center" align="center" style={{ height: '80vh' }}>
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
      </>
    </HomeLayout>
  );
}

export default LoginPage;
