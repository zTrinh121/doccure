import { Button, Card, Flex, Form, Input, Space } from 'antd';
import FloatLabel from '../../../components/ui/float-lable/FloatLabel';
import { useState } from 'react';
import { login } from '../../../lib/auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../../stores/authStore';
const { Meta } = Card;

const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const updateUsername = useAuthStore((state) => state.updateUsername);
  const updateAccessToken = useAuthStore((state) => state.updateAccessToken);

  const navigate = useNavigate();

  const onValuesChange = (_, allValues) => {
    setUsername(allValues.username);
    setPassword(allValues.password);
  };

  const onFinish = async (values) => {
    console.log(values);
    // console.log(registerWithEmailAndPassword());
    try {
      const response = await login(values);
      const decoded = jwtDecode(response.data.data.access_token);

      updateAccessToken(response.data.data.access_token);
      updateUsername(decoded.sub);

      navigate('/');
    } catch (error) {
      console.log('e');
      console.log(error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Full error object:', error.config);
    }
  };

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Meta title="Login Doccure" />

        <Form
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          name="basic"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <FloatLabel label="Username" name="username" value={username}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </FloatLabel>
          <FloatLabel label="Password" name="password" value={password}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </FloatLabel>
          <Form.Item>
            <Flex justify="flex-end" align="center">
              <a href="">Forgot password</a>
            </Flex>
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

export default LoginCard;
