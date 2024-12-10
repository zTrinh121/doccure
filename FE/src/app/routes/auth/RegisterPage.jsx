import loginImage from '../../../assets/login.png';
import RegisterCard from '../../../features/auth/components/RegisterCard';
import { Flex, Row, Col, Image, Skeleton } from 'antd';

const RegisterPage = () => {
  return (
    // <HomeLayout>
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
              <RegisterCard></RegisterCard>
            </Col>
            <Col className="col-span-1 md:col-span-2"></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default RegisterPage;
