import { Button, Card, Form, Input, Space } from 'antd';
const { Meta } = Card;

import { useNavigate } from 'react-router-dom';
import { sendResetEmail } from '../../../lib/auth';
import { getActions } from '../../../stores/authStore';
//todos:notification,disabled button

const ForgotPasswordEmailCard = () => {
  const navigate = useNavigate();
  const { setResetStep, setResetEmail } = getActions();

  const onFinish = async (values) => {
    try {
      const response = await sendResetEmail({ email: values.email });
      setResetStep('otp');
      setResetEmail(values.email);
      navigate('/otp');
    } catch (error) {
      console.log(error);
    }
  };

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
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default ForgotPasswordEmailCard;
