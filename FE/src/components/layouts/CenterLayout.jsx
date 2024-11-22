import { Row, Col } from 'antd';
import { memo } from 'react';

const CenterLayout = ({ children }) => {
  return (
    <Row>
      <Col sm={1} md={3}></Col>
      <Col sm={22} md={18}>
        {children}
      </Col>
      <Col sm={1} md={3}></Col>
    </Row>
  );
};

export default memo(CenterLayout);
