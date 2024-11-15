import { Button, Card, Form, Input, Space } from 'antd';
const { Meta } = Card;

import { useNavigate } from 'react-router-dom';
import { sendResetEmail } from '../../../lib/auth';
import { getActions, useResetStep } from '../../../stores/authStore';
import { Spin } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { notification } from '../../../utils/antDesignGlobals';
//todos:notification,disabled button

const ForgotPasswordEmailCard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setResetStep, setResetEmail } = getActions();
  const resetStep = useResetStep();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await sendResetEmail({ email: values.email });
      notification.success({
        message: 'Email sent',
        showProgress: true,
      });
      setResetEmail(values.email);
      setResetStep('otp');
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Error',
        
        showProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resetStep === 'otp') {
      navigate('/otp');
    }
  }, [resetStep, navigate]);

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Meta title="Forgot password?" />

        <Form
          layout="vertical"
          onFinish={onFinish}
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
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

export default ForgotPasswordEmailCard;
