import { Button, Card, Form, Input, Space } from 'antd';
const { Meta } = Card;
import { Spin } from 'antd';
import { Flex } from 'antd';

import { getActions, useResetEmail } from 'src/stores/authStore';
import { verifyOtp } from 'src/lib/auth';
import { useState } from 'react';
import { notification } from 'src/utils/antDesignGlobals';
import { useNavigateResetPassword } from 'src/hooks/useNavigateResetPassword';

const OtpCard = () => {
  const [loading, setLoading] = useState(false);
  const { setResetStep } = getActions();
  const resetEmail = useResetEmail();
  const [form] = Form.useForm();

  const onChange = async () => {
    form.submit();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await verifyOtp({ otp: values.otp, email: resetEmail });
      notification.success({
        message: 'Success',

        showProgress: true,
      });
      setResetStep('password');
    } catch (error) {
      notification.error({
        message: 'Error',

        showProgress: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (resetStep === 'password') {
  //     navigate('/resetPassword');
  //   }
  // }, [resetStep, navigate]);
  useNavigateResetPassword();

  return (
    <Card>
      <Space direction="vertical" size="middle" className="flex">
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
                {/* <ClockCircleOutlined /> */}
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
