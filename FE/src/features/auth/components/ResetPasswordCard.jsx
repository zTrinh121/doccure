import { Button, Card, Form, Input, Space } from 'antd';
import { forgotPassword } from '../../../lib/auth';
import { getActions, useResetEmail } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const ResetPasswordCard = () => {
  const email = useResetEmail();
  const navigate = useNavigate();
  const { setResetStep, setResetEmail } = getActions();

  const onFinish = async (values) => {
    try {
      let response = await forgotPassword({ values, email });

      setResetStep('');
      setResetEmail('');
      navigate('/');
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Repeat your password"
            name="repeatPassword"
            rules={[
              {
                required: true,
                message: 'Please repeat your password!',
              },
            ]}
          >
            <Input.Password />
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

export default ResetPasswordCard;

