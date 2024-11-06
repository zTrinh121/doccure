import { Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';

const SimpleLayout = () => {
  return (
    <Row>
      <Col sm={1} md={4}></Col>
      <Col sm={22} md={16}>
        <Outlet />
      </Col>
      <Col sm={1} md={4}></Col>
    </Row>
  );
};

export default SimpleLayout;
