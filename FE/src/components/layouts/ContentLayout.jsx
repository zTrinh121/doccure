import React from 'react';
import { Row, Col } from 'antd';

const ContentLayout = ({ children }) => {
  return (
    <Row>
      <Col sm={1} md={1}></Col>
      <Col sm={22} md={17}>
        {children}
      </Col>
      <Col sm={1} md={6}></Col>
    </Row>
  );
};

export default ContentLayout;
