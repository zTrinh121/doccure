import React from 'react';
import { Row, Col } from 'antd';

const ContentLayout = ({ children }) => {
  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>{children}</Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default ContentLayout;
