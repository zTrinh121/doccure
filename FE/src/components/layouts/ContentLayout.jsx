import React from 'react';
import { Row, Col } from 'antd';

const ContentLayout = ({ children }) => {
  return (
    <Row>
      <Col sm={1} md={4}></Col>
      <Col sm={22} md={16}>
        {children}
      </Col>
      <Col sm={1} md={4}></Col>
    </Row>
  );
};

export default ContentLayout;
