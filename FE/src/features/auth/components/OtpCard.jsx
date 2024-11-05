import { Button, Card, Form, Input, Space } from 'antd';
const { Meta } = Card;

import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../../../lib/auth';
import {
  getActions,
  useResetEmail,
  useResetStep,
} from '../../../stores/authStore';
import { Spin } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { Flex } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import Timer from '../../../components/ui/Timer';

const OtpCard = () => {
  const [loading, setLoading] = useState(false);
  const { setResetStep } = getActions();
  const resetEmail = useResetEmail();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const resetStep = useResetStep();

  const onChange = async () => {
    form.submit();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await verifyOtp({ otp: values.otp, email: resetEmail });
      setResetStep('password');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resetStep === 'password') {
      navigate('/resetPassword');
    }
  }, [resetStep, navigate]);

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
          <Flex vertical justify="space-around">
            <Flex justify="center">
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
            </Flex>
            <Flex justify="flex-end" align="flex-end">
              <div>
                <ClockCircleOutlined />
                {/* <Timer duration={60} /> */}
              </div>
            </Flex>
          </Flex>

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
