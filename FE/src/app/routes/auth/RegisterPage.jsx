import loginImage from '../../../assets/login.png';
import HomeLayout from '../../../components/layouts/HomeLayout';
import RegisterCard from '../../../features/auth/components/RegisterCard';
import { Flex, Row, Col, Image, Skeleton } from 'antd';

const RegisterPage = () => {
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
                <RegisterCard></RegisterCard>
              </Col>
              <Col span={4}></Col>
            </Row>
          </Flex>
        </div>
      </>
    </HomeLayout>
  );
};

export default RegisterPage;
