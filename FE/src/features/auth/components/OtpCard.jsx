import { Button, Card, Form, Input, Space } from 'antd';
const { Meta } = Card;

import { useNavigate } from 'react-router-dom';
import { sendResetEmail, verifyOtp } from '../../../lib/auth';
import { getActions, useResetEmail } from '../../../stores/authStore';
import { Spin } from 'antd';
import { useState } from 'react';

const OtpCard = () => {
  const [loading, setLoading] = useState(false);
  const { setResetStep } = getActions();
  const resetEmail = useResetEmail();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onChange = async () => {
    form.submit();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await verifyOtp({ otp: values.otp, email: resetEmail });
      setResetStep('password');
      navigate('/resetPassword');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Meta title="Enter OTP" />
        An email with the OTP has been sent to {resetEmail}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="OTP"
            name="otp"
            rules={[
              {
                required: true,
                message: 'Please input your otp!',
              },
            ]}
          >
            <Input.OTP
              formatter={(str) => str.toUpperCase()}
              onChange={onChange}
              onPressEnter={onChange}
            />
          </Form.Item>

          <Form.Item>
            <Spin spinning={loading}>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Spin>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default OtpCard;
