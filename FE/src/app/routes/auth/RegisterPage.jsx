import loginImage from '../../../assets/login.png';
import RegisterCard from '../../../features/auth/components/RegisterCard';
import { Flex, Row, Col, Image, Skeleton } from 'antd';

const RegisterPage = () => {
  return (
    // <HomeLayout>
      <>
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
                <RegisterCard></RegisterCard>
              </Col>
              <Col span={4}></Col>
            </Row>
          </Flex>
        </div>
      </>

  );
};

export default RegisterPage;
